import FadeIn from "./FadeIn";
import ContactForm from "./ContactForm";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact">
      <FadeIn as="div" className="section-header">
        <div className="section-tag">Contact</div>
        <h2 className="section-title">
          Let&apos;s <span>Work Together</span>
        </h2>
        <p className="section-subtitle">
          Have a project in mind? I&apos;d love to hear about it.
        </p>
      </FadeIn>
      <div className="contact-grid">
        <FadeIn className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            Whether you have a project, a question, or just want to say hi —
            my inbox is always open. I&apos;ll get back to you as soon as
            possible.
          </p>
          <div className="contact-detail">
            <div className="contact-detail-icon">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div>
              <div className="contact-detail-label">Email</div>
              <div className="contact-detail-value">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
          </div>
          <div className="contact-detail">
            <div className="contact-detail-icon">
              <ion-icon name="call-outline"></ion-icon>
            </div>
            <div>
              <div className="contact-detail-label">Phone</div>
              <div className="contact-detail-value">
                <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
              </div>
            </div>
          </div>
          <div className="contact-detail">
            <div className="contact-detail-icon">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div>
              <div className="contact-detail-label">Location</div>
              <div className="contact-detail-value">{profile.location}</div>
            </div>
          </div>
          <div className="contact-social-row">
            <a
              href={profile.linkedin}
              className="social-btn"
              target="_blank"
              rel="noopener"
            >
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a
              href={profile.github}
              className="social-btn"
              target="_blank"
              rel="noopener"
            >
              <ion-icon name="logo-github"></ion-icon>
            </a>
            <a href={`mailto:${profile.email}`} className="social-btn">
              <ion-icon name="mail-outline"></ion-icon>
            </a>
            <a href={`tel:${profile.phoneHref}`} className="social-btn">
              <ion-icon name="call-outline"></ion-icon>
            </a>
          </div>
          <div className="map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.1975543566235!2d121.17579647483211!3d14.225551187998844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63f7e92aeb7d%3A0xd1c3e1b96c7b6cc3!2sPansol%2C%20Calamba%2C%20Laguna%2C%20Philippines!5e0!3m2!1sen!2sph!4v1734743000000!5m2!1sen!2sph"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </FadeIn>
        <FadeIn className="contact-form-wrap" delay={0.15}>
          <h3>Send a Message</h3>
          <p>
            Fill out the form below and I&apos;ll reply straight to your
            inbox — usually within a day.
          </p>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
