"use client";
import { useEffect, useRef, useState } from "react";

export default function SectionHeading({ subtitle, title, description, light = false, center = true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-12 ${center ? "text-center" : ""} ${visible ? "animate-fade-in-up" : "opacity-0"}`}
    >
      {subtitle && (
        <p className="text-gold font-medium text-sm uppercase tracking-[0.2em] mb-3">
          {subtitle}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 ${
          light ? "text-white" : "text-charcoal dark:text-cream"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-base leading-relaxed ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-charcoal/60 dark:text-cream/60"}`}
        >
          {description}
        </p>
      )}
      <div className={`mt-4 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
        <span className="w-8 h-0.5 bg-gold/40 rounded-full" />
        <span className="w-3 h-3 border-2 border-gold rounded-full" />
        <span className="w-8 h-0.5 bg-gold/40 rounded-full" />
      </div>
    </div>
  );
}
