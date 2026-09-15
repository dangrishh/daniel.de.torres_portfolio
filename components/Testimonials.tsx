import FadeIn from "./FadeIn";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <div id="testimonials">
      <div className="test-wrap">
        <FadeIn as="div" className="section-header">
          <div className="section-tag">Testimonials</div>
          <h2 className="section-title">
            What People <span>Say</span>
          </h2>
          <p className="section-subtitle">
            Feedback from colleagues and clients I&apos;ve had the pleasure
            of working with.
          </p>
        </FadeIn>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <FadeIn
              key={t.name}
              className="testimonial-card"
              delay={i * 0.15}
            >
              <div className="quote-icon">&quot;</div>
              <p
                className="testimonial-text"
                style={{ whiteSpace: "pre-line" }}
              >
                {t.text}
              </p>
              <div className="testimonial-author">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.image} alt={t.name} />
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-date">{t.date}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
