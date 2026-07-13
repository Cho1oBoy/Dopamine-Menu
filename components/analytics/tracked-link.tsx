"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { trackAnalyticsInput, type AnalyticsEventInput } from "../../lib/analytics";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
    analyticsEvents: AnalyticsEventInput[];
    children: ReactNode;
  };

export function TrackedLink({ analyticsEvents, children, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={() => {
        analyticsEvents.forEach(trackAnalyticsInput);
      }}
    >
      {children}
    </Link>
  );
}
