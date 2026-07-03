"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type SplitTextProps = {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  text?: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: Record<string, number | string>;
  to?: Record<string, number | string>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "start" | "end";
  onLetterAnimationComplete?: () => void;
};

function resolveSegments(text: string, splitType: SplitTextProps["splitType"]) {
  if (splitType === "words" || splitType === "words, chars") {
    return text.split(" ").map((segment, index, items) => ({
      value: segment,
      trailingSpace: index < items.length - 1
    }));
  }

  return text.split("").map((segment) => ({
    value: segment,
    trailingSpace: false
  }));
}

function resolveEase(ease: string) {
  if (ease === "power3.out") {
    return [0.22, 1, 0.36, 1] as const;
  }

  if (ease === "power2.out") {
    return [0.25, 1, 0.5, 1] as const;
  }

  return "easeOut" as const;
}

export default function SplitText({
  tag = "p",
  text = "",
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const segments = resolveSegments(text, splitType);
  const ComponentTag = tag;

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        textAlign,
        overflow: "hidden",
        whiteSpace: "normal"
      }}
    >
      <ComponentTag className="m-0">
        <span
          className={
            splitType === "chars"
              ? "inline-flex flex-wrap"
              : "inline-flex flex-wrap items-baseline gap-x-[0.02em]"
          }
        >
          {segments.map((segment, index) => (
            <motion.span
              className="inline-block will-change-[transform,opacity]"
              key={`${segment.value}-${index}`}
              initial={from}
              animate={inView ? to : from}
              onAnimationComplete={
                index === segments.length - 1 ? onLetterAnimationComplete : undefined
              }
              transition={{
                delay: (index * delay) / 1000,
                duration,
                ease: resolveEase(ease)
              }}
            >
              {segment.value === " " ? "\u00A0" : segment.value}
              {segment.trailingSpace ? "\u00A0" : null}
            </motion.span>
          ))}
        </span>
      </ComponentTag>
    </div>
  );
}
