import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={[
        "rounded-[1.9rem] border border-[var(--line)] bg-[var(--surface)]/96 p-5 shadow-[0_24px_56px_rgba(88,62,53,0.08)] backdrop-blur",
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
