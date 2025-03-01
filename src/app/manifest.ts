import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    dir: "rtl",
    lang: "fa",
    scope: "/",
    name: "Fenjoon",
    short_name: "Fenjoon",
    prefer_related_applications: false,
    description: `Fenjoon is a PWA for reading and writing short stories. Fast, lightweight, and always accessible`,
    categories: ["books", "entertainment", "lifestyle", "writing", "news", "education"],
    start_url: "/",
    display: "fullscreen",
    background_color: "#2e2e2e",
    theme_color: "#e0e0e0",
    orientation: "portrait",
    launch_handler: {
      client_mode: "auto",
    },
    protocol_handlers: [
      {
        protocol: "fenjoon",
        url: "/",
      },
    ],
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
    screenshots: [
      {
        src: "/manifest-assets/screenshots/apple-splash-2048-2732.jpg",
        sizes: "2048x2732",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1668-2388.jpg",
        sizes: "1668x2388",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1536-2048.jpg",
        sizes: "1536x2048",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1488-2266.jpg",
        sizes: "1488x2266",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1640-2360.jpg",
        sizes: "1640x2360",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1668-2224.jpg",
        sizes: "1668x2224",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1620-2160.jpg",
        sizes: "1620x2160",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1320-2868.jpg",
        sizes: "1320x2868",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1206-2622.jpg",
        sizes: "1206x2622",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1290-2796.jpg",
        sizes: "1290x2796",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1179-2556.jpg",
        sizes: "1179x2556",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1284-2778.jpg",
        sizes: "1284x2778",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1170-2532.jpg",
        sizes: "1170x2532",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1125-2436.jpg",
        sizes: "1125x2436",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1242-2688.jpg",
        sizes: "1242x2688",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-828-1792.jpg",
        sizes: "828x1792",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-1242-2208.jpg",
        sizes: "1242x2208",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-750-1334.jpg",
        sizes: "750x1334",
        type: "image/jpeg",
      },
      {
        src: "/manifest-assets/screenshots/apple-splash-640-1136.jpg",
        sizes: "640x1136",
        type: "image/jpeg",
      },
    ],
  };
}
