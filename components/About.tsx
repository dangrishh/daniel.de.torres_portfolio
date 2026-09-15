import FadeIn from "./FadeIn";
import { profile, services } from "@/lib/data";

export default function About() {
  return (
    <section id="about">
      <FadeIn as="div" className="section-header">
        <div className="section-tag">About Me</div>
        <h2 className="section-title">
          Turning Ideas into <span>Digital Reality</span>
        </h2>
        <p className="section-subtitle">
          Crafting scalable, modern solutions that look great and perform
          even better.
        </p>
      </FadeIn>
      <div className="about-grid">
        <FadeIn className="about-text">
          <p>
            I&apos;m a Web and Mobile Developer specializing in building
            responsive and high-performing applications. I enjoy
            transforming complex technical challenges into smooth,
            efficient, and user-friendly digital solutions.
          </p>
          <p>
            My aim is to deliver scalable, secure, and modern applications
            using technologies like AWS Cloud, MERN Stack with TypeScript,
            React Native for POS systems, and Next.js for frontend
            development. I also have experience working as a freelance
            developer in Australia, contributing to responsive and
            maintainable web solutions.
          </p>
          <div className="services-grid" style={{ marginTop: 28 }}>
            {services.map((service, i) => (
              <FadeIn
                key={service.title}
                className="service-card"
                delay={i * 0.1}
              >
                <div className="service-icon">
                  <ion-icon name={service.icon}></ion-icon>
                </div>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn className="about-right" delay={0.2}>
          <div className="info-card">
            <div className="info-card-icon">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div>
              <div className="info-card-label">Email</div>
              <div className="info-card-value">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">
              <ion-icon name="call-outline"></ion-icon>
            </div>
            <div>
              <div className="info-card-label">Phone</div>
              <div className="info-card-value">
                <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
              </div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div>
              <div className="info-card-label">Location</div>
              <div className="info-card-value">{profile.location}</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">
              <ion-icon name="logo-linkedin"></ion-icon>
            </div>
            <div>
              <div className="info-card-label">LinkedIn</div>
              <div className="info-card-value">
                <a href={profile.linkedin} target="_blank" rel="noopener">
                  {profile.linkedinHandle}
                </a>
              </div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">
              <ion-icon name="school-outline"></ion-icon>
            </div>
            <div>
              <div className="info-card-label">Education</div>
              <div className="info-card-value">{profile.education}</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">
              <ion-icon name="briefcase-outline"></ion-icon>
            </div>
            <div>
              <div className="info-card-label">Status</div>
              <div className="info-card-value" style={{ color: "#22c55e" }}>
                Open to opportunities
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
