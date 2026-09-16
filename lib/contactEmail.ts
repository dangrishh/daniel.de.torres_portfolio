import { profile } from "./data";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:#6b7280;">
          ${label}
        </p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;color:#111827;line-height:1.5;">
          ${value}
        </p>
      </td>
    </tr>`;
}

export function renderContactEmail(data: ContactEmailData): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");
  const initial = data.name.trim().charAt(0).toUpperCase() || "?";

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New portfolio inquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none;font-size:1px;color:#f3f4f6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
      New message from ${name} — ${data.subject.slice(0, 100)}
    </span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(17,24,39,0.08);">
            <!-- Header -->
            <tr>
              <td style="background-color:#312e81;padding:32px 32px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="middle" width="46">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="width:40px;height:40px;background-color:rgba(255,255,255,0.16);border-radius:10px;">
                        <tr>
                          <td align="center" valign="middle" style="width:40px;height:40px;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:900;color:#ffffff;">
                            D
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="middle" style="padding-left:12px;">
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#ffffff;">
                        ${escapeHtml(profile.name)}
                      </p>
                      <p style="margin:2px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:rgba(255,255,255,0.75);">
                        Portfolio Contact Form
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Title -->
            <tr>
              <td style="padding:32px 32px 4px;">
                <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#4338ca;">
                  New Website Inquiry
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="middle" style="width:44px;height:44px;background-color:#e0e7ff;border-radius:50%;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" valign="middle" style="width:44px;height:44px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:800;color:#4338ca;">
                            ${initial}
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="middle" style="padding-left:14px;">
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#111827;">
                        ${name}
                      </p>
                      <p style="margin:2px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7280;">
                        sent a message about <strong style="color:#111827;">${subject}</strong>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Details -->
            <tr>
              <td style="padding:12px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Email", `<a href="mailto:${email}" style="color:#4338ca;text-decoration:none;">${email}</a>`)}
                  ${row("Subject", subject)}
                </table>
                <p style="margin:18px 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:#6b7280;">
                  Message
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7;border-radius:12px;">
                  <tr>
                    <td style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#111827;">
                      ${message}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- CTA -->
            <tr>
              <td style="padding:24px 32px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:8px;background-color:#4338ca;">
                      <a href="mailto:${email}" style="display:inline-block;padding:13px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;">
                        Reply to ${name} &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px;background-color:#f5f5f7;border-top:1px solid #e5e7eb;">
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#111827;">
                  ${escapeHtml(profile.name)} &middot; ${escapeHtml(profile.role)}
                </p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;line-height:1.6;">
                  ${escapeHtml(profile.location)} &middot;
                  <a href="tel:${profile.phoneHref}" style="color:#6b7280;">${escapeHtml(profile.phone)}</a>
                </p>
                <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9ca3af;">
                  Sent automatically from the portfolio website contact form.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
