import FadeIn from "./FadeIn";
import { workExperience, education } from "@/lib/data";

function TimelineList({
  items,
}: {
  items: { period: string; role: string; company: string; bullets: string[] }[];
}) {
  return (
    <div className="timeline-items">
      {items.map((item) => (
        <div className="timeline-item" key={item.period + item.role}>
          <div className="timeline-dot"></div>
          <div className="timeline-period">{item.period}</div>
          <div className="timeline-role">{item.role}</div>
          <div className="timeline-company">{item.company}</div>
          <ul className="timeline-desc">
            {item.bullets.map((bullet) => {
              const [highlight, ...rest] = bullet.split(" — ");
              const restText = rest.join(" — ");
              return (
                <li key={bullet}>
                  {restText ? (
                    <>
                      <span className="desc-highlight">{highlight}</span> —{" "}
                      {restText}
                    </>
                  ) : (
                    bullet
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience">
      <FadeIn as="div" className="section-header">
        <div className="section-tag">Background</div>
        <h2 className="section-title">
          Experience & <span>Education</span>
        </h2>
        <p className="section-subtitle">
          My professional journey and academic foundation.
        </p>
      </FadeIn>
      <div className="exp-grid">
        <FadeIn className="timeline">
          <div className="timeline-title">
            <ion-icon name="briefcase-outline"></ion-icon> Work Experience
          </div>
          <TimelineList items={workExperience} />
        </FadeIn>
        <FadeIn className="timeline" delay={0.15}>
          <div className="timeline-title">
            <ion-icon name="school-outline"></ion-icon> Education
          </div>
          <TimelineList items={education} />
        </FadeIn>
      </div>
    </section>
  );
}
