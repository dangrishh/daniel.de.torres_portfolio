import { NextResponse } from "next/server";
import { getResendClient } from "@/lib/resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 100, email: 200, subject: 150, message: 5000 };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "").trim();

  // Honeypot field is hidden from real users — if it's filled, silently
  // report success so bots don't learn to avoid it.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in all fields." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (
    name.length > MAX_LEN.name ||
    email.length > MAX_LEN.email ||
    subject.length > MAX_LEN.subject ||
    message.length > MAX_LEN.message
  ) {
    return NextResponse.json(
      { error: "One of the fields is too long." },
      { status: 400 },
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!toEmail || !fromEmail) {
    console.error("Contact form is missing CONTACT_TO_EMAIL/CONTACT_FROM_EMAIL env vars");
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email me directly." },
      { status: 500 },
    );
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: `Portfolio Contact Form <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email me directly." },
      { status: 500 },
    );
  }
}
