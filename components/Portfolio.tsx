"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import { projects } from "@/lib/data";

const filters = [
  { label: "All", value: "all" },
  { label: "Web Development", value: "web development" },
  { label: "Applications", value: "applications" },
];

export default function Portfolio() {
  const [active, setActive] = useState("all");

  return (
    <section id="portfolio">
      <FadeIn as="div" className="section-header">
        <div className="section-tag">Portfolio</div>
        <h2 className="section-title">
          Featured <span>Projects</span>
        </h2>
        <p className="section-subtitle">
          A selection of projects I&apos;ve built and shipped.
        </p>
      </FadeIn>
      <FadeIn className="filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-btn${active === filter.value ? " active" : ""}`}
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </FadeIn>
      <div className="projects-grid" id="projectsGrid">
        {projects.map((project, i) => (
          <FadeIn
            key={project.name}
            className={`project-card${
              active !== "all" && active !== project.category ? " hidden" : ""
            }`}
            delay={i * 0.05}
          >
            <div className="project-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.alt} loading="lazy" />
              <div className="project-overlay">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener"
                  className="project-link-btn"
                >
                  <ion-icon name="eye-outline"></ion-icon> {project.linkLabel}
                </a>
              </div>
            </div>
            <div className="project-info">
              <div className="project-cat">
                {project.category === "web development"
                  ? "Web Development"
                  : "Applications"}
              </div>
              <div className="project-name">{project.name}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
