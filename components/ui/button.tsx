import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(180deg,var(--accent),var(--accent-strong))] text-[var(--accent-ink)] shadow-[0_18px_42px_rgba(214,116,90,0.30)] hover:translate-y-[-1px] hover:shadow-[0_22px_50px_rgba(214,116,90,0.34)]",
  secondary:
    "bg-[rgba(255,249,245,0.88)] text-[var(--ink)] ring-1 ring-[var(--line)] hover:bg-white",
  ghost: "bg-transparent text-[var(--ink-soft)] hover:bg-white/60"
};

export function Button({
  children,
  className = "",
  fullWidth = true,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "rounded-[1.5rem] px-5 py-4 text-sm font-semibold tracking-[-0.01em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        fullWidth ? "w-full" : "",
        variantClassName[variant],
        className
      ].join(" ")}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
