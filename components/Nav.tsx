"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <a href="#hero" className="nav-logo">
        {profile.name}
      </a>
      <ul className={`nav-links${open ? " open" : ""}`} id="navLinks">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
        <li className="nav-theme-item">
          <ThemeToggle id="themeToggleMobile" />
        </li>
      </ul>
      <div className="nav-actions">
        <ThemeToggle id="themeToggle" />
        <a href={`mailto:${profile.email}`} className="nav-cta">
          Hire Me
        </a>
      </div>
      <button
        className="hamburger"
        id="hamburger"
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
