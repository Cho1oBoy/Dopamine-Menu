import Link from "next/link";

import { AppShell } from "../../components/app-shell";

export default function AppPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6 sm:pt-6">
        <Link
          className="inline-flex min-h-[2.8rem] items-center justify-center rounded-full border border-[rgba(120,83,66,0.10)] bg-white/78 px-4 text-sm font-semibold text-[var(--ink)] shadow-[0_12px_28px_rgba(88,62,53,0.05)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          href="/"
        >
          На лендинг
        </Link>
      </div>
      <AppShell />
    </>
  );
}
