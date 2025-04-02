import "swiper/css";
import "./globals.css";
import Providers from "@/providers";
import type { Viewport } from "next";
import { aria } from "@/lib/configs/fonts";
import BottomNavigationSafeZone from "@/components/BottomNavigationSafeZone";
export { metadata } from "@/lib/configs/metadata";

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
  themeColor: "#2e2e2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa-IR" suppressHydrationWarning>
      <body className={aria.className}>
        <Providers>
          <div className="max-w-[480px] relative lg:border-x lg:border-border mx-auto">
            <BottomNavigationSafeZone>{children}</BottomNavigationSafeZone>
          </div>
        </Providers>
      </body>
    </html>
  );
}
