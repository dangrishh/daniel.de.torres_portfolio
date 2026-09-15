"use client";

import { useEffect, useRef, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  id?: string;
  style?: React.CSSProperties;
};

export default function FadeIn({
  children,
  className = "",
  delay,
  as = "div",
  id,
  style,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(delay ? { transitionDelay: `${delay}s` } : {}),
  };

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`fade-in ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
}
