import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

const serviceWorkerSource = readFileSync(
  join(process.cwd(), "public", "sw.js"),
  "utf8"
);

describe("PWA service worker", () => {
  test("uses network-first navigation so deployments do not require a hard refresh", () => {
    expect(serviceWorkerSource).toContain('const CACHE_NAME = "dopamine-menu-v2"');
    expect(serviceWorkerSource).toContain('request.mode === "navigate"');
    expect(serviceWorkerSource).toContain("fetch(request)");
    expect(serviceWorkerSource).toContain("caches.match(request)");

    const navigationBranch = serviceWorkerSource.indexOf('request.mode === "navigate"');
    const networkRequest = serviceWorkerSource.indexOf("fetch(request)", navigationBranch);
    const cacheFallback = serviceWorkerSource.indexOf("caches.match(request)", navigationBranch);

    expect(networkRequest).toBeGreaterThan(navigationBranch);
    expect(cacheFallback).toBeGreaterThan(networkRequest);
  });
});
