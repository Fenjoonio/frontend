import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "فنجون؛ شبکه اجتماعی داستان‌های کوتاه",
    template: "%s | فنجون",
  },
  description: "یک دنیا داستان‌های خواندنی کوتاه",
  metadataBase: new URL("/", "https://fenjoon.io"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "فنجون",
    startupImage: "/manifest-assets/screenshots/apple-splash-2048-2732.jpg",
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    {
      url: "/manifest-assets/icons/icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/manifest-assets/icons/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  openGraph: {
    title: "فنجون؛ شبکه اجتماعی داستان‌های کوتاه",
    description: "یک دنیا داستان‌های خواندنی کوتاه",
    url: "/",
    siteName: "فنجون",
    images: [
      {
        url: "/manifest-assets/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "فنجون",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};
