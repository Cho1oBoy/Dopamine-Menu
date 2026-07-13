"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

import { setAnalyticsAdapter } from "../../lib/analytics";

type YandexMetricaProps = {
  counterId: string;
};

type YandexMetricaFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexMetricaFunction;
  }
}

function parseCounterId(value: string) {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const counterId = Number(value);
  return Number.isSafeInteger(counterId) && counterId > 0 ? counterId : null;
}

function ensureYandexQueue() {
  if (window.ym) {
    return window.ym;
  }

  const ym: YandexMetricaFunction = (...args: unknown[]) => {
    ym.a = ym.a ?? [];
    ym.a.push(args);
  };
  ym.l = Date.now();
  window.ym = ym;

  return ym;
}

export function YandexMetrica({ counterId: rawCounterId }: YandexMetricaProps) {
  const pathname = usePathname();
  const previousUrl = useRef<string | null>(null);
  const counterId = parseCounterId(rawCounterId);

  useEffect(() => {
    if (!counterId) {
      return;
    }

    const ym = ensureYandexQueue();
    ym(counterId, "init", {
      accurateTrackBounce: true,
      clickmap: true,
      defer: true,
      sendTitle: true,
      trackLinks: true,
      webvisor: false
    });

    return setAnalyticsAdapter((event) => {
      ym(counterId, "reachGoal", event.name, event.properties);
    });
  }, [counterId]);

  useEffect(() => {
    if (!counterId) {
      return;
    }

    const ym = ensureYandexQueue();
    const currentUrl = window.location.href;

    ym(counterId, "hit", currentUrl, {
      referer: previousUrl.current ?? document.referrer,
      title: document.title
    });
    previousUrl.current = currentUrl;
  }, [counterId, pathname]);

  if (!counterId) {
    return null;
  }

  return (
    <Script
      id="yandex-metrica"
      src={`https://mc.yandex.ru/metrika/tag.js?id=${counterId}`}
      strategy="afterInteractive"
    />
  );
}
