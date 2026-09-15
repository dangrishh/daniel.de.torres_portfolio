"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";
import { heroSlides, profile } from "@/lib/data";
import { CV_FILE_PATH } from "@/lib/data";
import { useDownloadToast } from "./DownloadToastProvider";

const SLIDE_DURATION = 4000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { showDownloadToast } = useDownloadToast();

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoplay]);

  const goTo = (index: number) => {
    setActive(index);
    startAutoplay();
  };

  const slide = heroSlides[active];

  return (
    <section id="hero">
      <div className="hero-bg-orb orb-1"></div>
      <div className="hero-bg-orb orb-2"></div>
      <div className="hero-content">
        <FadeIn className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Available for opportunities
          </div>
          <h1 className="hero-title">
            Hi, I&apos;m
            <br />
            <span className="name-gradient">{profile.name}</span>
          </h1>
          <div
            className="hero-slider"
            id="heroSlider"
            style={
              { "--slide-accent": slide.accent } as React.CSSProperties
            }
            onMouseEnter={() => {
              if (timerRef.current) clearInterval(timerRef.current);
            }}
            onMouseLeave={startAutoplay}
          >
            <div className="hero-slide-track">
              {heroSlides.map((s, i) => (
                <div
                  key={s.role}
                  className={`hero-slide${i === active ? " active" : ""}`}
                  data-accent={s.accent}
                >
                  <div className="hero-slide-role">{s.role}</div>
                  <p className="hero-slide-desc">{s.desc}</p>
                  <div className="hero-slide-stat">
                    <strong>{s.statValue}</strong> {s.statLabel}
                  </div>
                </div>
              ))}
            </div>
            <div className="hero-slide-progress" id="heroSlideProgress">
              {heroSlides.map((s, i) => (
                <span
                  key={s.role}
                  className={`progress-seg${i === active ? " active" : ""}${
                    i < active ? " done" : ""
                  }`}
                  data-index={i}
                  onClick={() => goTo(i)}
                >
                  <i></i>
                </span>
              ))}
            </div>
          </div>
          <div className="hero-btns">
            <a href="#portfolio" className="btn-primary">
              <ion-icon name="grid-outline"></ion-icon> View Work
            </a>
            <a href="#contact" className="btn-outline">
              <ion-icon name="mail-outline"></ion-icon> Get in Touch
            </a>
            <a
              href={CV_FILE_PATH}
              download
              className="btn-outline"
              onClick={() => showDownloadToast()}
            >
              <ion-icon name="download-outline"></ion-icon> Download CV
            </a>
          </div>
        </FadeIn>

        <FadeIn className="hero-right" delay={0.2}>
          <div className="hero-profile-card">
            <div className="profile-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dt-brown.jpg" alt={profile.name} />
              <div className="profile-status"></div>
            </div>
            <div className="profile-name">{profile.name}</div>
            <div className="profile-role">{"// "}{profile.role}</div>
            <div className="profile-divider"></div>
            <div className="profile-contact-item">
              <ion-icon name="mail-outline"></ion-icon>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className="profile-contact-item">
              <ion-icon name="phone-portrait-outline"></ion-icon>
              <span>{profile.phone}</span>
            </div>
            <div className="profile-contact-item">
              <ion-icon name="location-outline"></ion-icon>
              <span>Calamba City, Laguna, PH</span>
            </div>
            <div className="profile-social">
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
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
