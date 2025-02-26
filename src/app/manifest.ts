import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    dir: "rtl",
    lang: "fa",
    name: "Fenjoon",
    short_name: "Fenjoon",
    description: `Fenjoon is a PWA for reading and writing short stories. Fast, lightweight, and always accessible`,
    categories: ["books", "entertainment", "lifestyle", "writing", "news", "education"],
    start_url: "/",
    display: "standalone",
    background_color: "#2e2e2e",
    theme_color: "#e0e0e0",
    orientation: "portrait",
    launch_handler: {
      client_mode: "auto",
    },
    icons: [
      {
        src: "/manifest-assets/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/manifest-assets/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
