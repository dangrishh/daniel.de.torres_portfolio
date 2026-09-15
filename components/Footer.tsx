import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-logo">{profile.name}</div>
      <div className="footer-copy">
        © {year} {profile.name}. Built with passion.
      </div>
      <div className="footer-links">
        <a href="#about">About</a>
        <a href="#portfolio">Work</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
}
