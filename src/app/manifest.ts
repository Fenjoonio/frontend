import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "فنجون",
    short_name: "Fenjoon",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#2e2e2e",
    theme_color: "#e0e0e0",
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
