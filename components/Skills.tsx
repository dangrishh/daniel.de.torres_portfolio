import FadeIn from "./FadeIn";
import { skillCategories } from "@/lib/data";

export default function Skills() {
  return (
    <div id="skills">
      <div className="skills-wrap">
        <FadeIn as="div" className="section-header">
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">
            Skills & <span>Technologies</span>
          </h2>
          <p className="section-subtitle">
            The tools and technologies I work with every day.
          </p>
        </FadeIn>
        <FadeIn className="skills-categories">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <div className="skill-category-title">{category.title}</div>
              <div className="skills-tags">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`skill-tag${skill.highlight ? " highlight" : ""}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </div>
  );
}
