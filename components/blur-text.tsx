"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type AnimationSnapshot = {
  filter?: string;
  opacity?: number;
  y?: number;
};

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (value: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: "p" | "div" | "span";
};

const buildKeyframes = (from: AnimationSnapshot, steps: AnimationSnapshot[]) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((snapshot) => Object.keys(snapshot))
  ]);

  const keyframes: Record<string, Array<string | number | undefined>> = {};

  keys.forEach((key) => {
    keyframes[key] = [
      from[key as keyof AnimationSnapshot],
      ...steps.map((snapshot) => snapshot[key as keyof AnimationSnapshot])
    ];
  });

  return keyframes;
};

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (value) => value,
  onAnimationComplete,
  stepDuration = 0.35,
  as = "p"
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5
      },
      { filter: "blur(0px)", opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, index) =>
    stepCount === 1 ? 0 : index / (stepCount - 1)
  );

  const ComponentTag = as;
  const ElementTag = ComponentTag as "p" | "div" | "span";

  return (
    <ElementTag
      aria-label={text}
      className={className}
      ref={(node) => {
        ref.current = node;
      }}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        return (
          <motion.span
            animate={(inView ? animateKeyframes : fromSnapshot) as never}
            className="inline-block will-change-[transform,filter,opacity]"
            initial={fromSnapshot as never}
            key={`${segment}-${index}`}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            transition={{
              duration: totalDuration,
              ease: easing,
              times,
              delay: (index * delay) / 1000
            } as never}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : null}
          </motion.span>
        );
      })}
    </ElementTag>
  );
}
