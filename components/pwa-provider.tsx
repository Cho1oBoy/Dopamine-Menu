"use client";

import { useEffect } from "react";

export function PwaProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none"
        });
        await registration.update();
      } catch (error) {
        console.error("PWA service worker registration failed", error);
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
}
