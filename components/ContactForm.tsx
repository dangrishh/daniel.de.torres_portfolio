"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      // honeypot field — real users never fill this in
      company: String(formData.get("company") || ""),
    };

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Your name"
            required
            maxLength={100}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="you@example.com"
            required
            maxLength={200}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="form-input"
          placeholder="What's this about?"
          required
          maxLength={150}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="form-textarea"
          placeholder="Tell me about your project..."
          required
          maxLength={5000}
        ></textarea>
      </div>
      {/* honeypot — hidden from real users, bots tend to fill every field */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        className="btn-primary form-submit-btn"
        disabled={status === "sending"}
      >
        <ion-icon name="paper-plane-outline"></ion-icon>
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="form-status success" role="status">
          Thanks for reaching out! I&apos;ll get back to you as soon as
          possible.
        </p>
      )}
      {status === "error" && (
        <p className="form-status error" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
