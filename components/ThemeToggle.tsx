"use client";

export default function ThemeToggle({ id }: { id?: string }) {
  const toggleTheme = () => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist
    }
  };

  return (
    <button
      className="theme-toggle"
      id={id}
      aria-label="Toggle dark and light mode"
      onClick={toggleTheme}
    >
      <ion-icon className="icon-sun" name="sunny-outline"></ion-icon>
      <ion-icon className="icon-moon" name="moon-outline"></ion-icon>
    </button>
  );
}
