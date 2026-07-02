import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dopamine Menu",
    short_name: "Dopamine Menu",
    description: "Короткие паузы и действия для моментов, когда тянет в быстрый дофамин.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f1ec",
    theme_color: "#f9f1ec",
    lang: "ru",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
