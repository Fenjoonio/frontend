import localFont from "next/font/local";

export const aria = localFont({
  preload: false,
  display: "swap",
  variable: "--font-aria",
  src: [
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-Thin.woff2",
      weight: "100",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-ExtraLight.woff2",
      weight: "200",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-Light.woff2",
      weight: "300",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-Normal.woff2",
      weight: "400",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-UltraBold.woff2",
      weight: "800",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-Black.woff2",
      weight: "900",
    },
    {
      path: "../../../public/assets/fonts/aria/AriaWebFaNum-Heavy.woff2",
      weight: "900",
    },
  ],
});
