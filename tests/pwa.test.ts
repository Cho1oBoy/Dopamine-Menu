import { describe, expect, test } from "vitest";

import manifest from "../app/manifest";
import { metadata, viewport } from "../app/layout";

describe("pwa setup", () => {
  test("exposes an installable web manifest", () => {
    const result = manifest();

    expect(result.name).toBe("Dopamine Menu");
    expect(result.short_name).toBe("Dopamine Menu");
    expect(result.display).toBe("standalone");
    expect(result.start_url).toBe("/");
    expect(result.icons?.some((icon) => icon.sizes === "192x192")).toBe(true);
    expect(result.icons?.some((icon) => icon.sizes === "512x512")).toBe(true);
  });

  test("declares manifest, theme color, and mobile viewport metadata", () => {
    expect(metadata.manifest).toBe("/manifest.webmanifest");
    expect(viewport.themeColor).toBe("#f9f1ec");
    expect(viewport.width).toBe("device-width");
    expect(viewport.initialScale).toBe(1);
    expect(viewport.viewportFit).toBe("cover");
  });
});
