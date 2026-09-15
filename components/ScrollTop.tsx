"use client";

import { useEffect, useState } from "react";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`scroll-top${visible ? " visible" : ""}`}
      id="scrollTop"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ion-icon name="chevron-up-outline"></ion-icon>
    </button>
  );
}
