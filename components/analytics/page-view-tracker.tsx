"use client";

import { useEffect } from "react";

import { trackEvent } from "../../lib/analytics";

type PageViewTrackerProps = {
  name: "landing_view" | "challenge_page_viewed";
};

export function PageViewTracker({ name }: PageViewTrackerProps) {
  useEffect(() => {
    trackEvent(name, {});
  }, [name]);

  return null;
}
