import localFont from "next/font/local";

export const yekanBakh = localFont({
  display: "swap",
  variable: "--font-yekan-bakh",
  src: [
    {
      path: "../../../public/assets/fonts/yekan-bakh/YekanBakhFaNum-Thin.woff2",
      weight: "100",
    },
    {
      path: "../../../public/assets/fonts/yekan-bakh/YekanBakhFaNum-Light.woff2",
      weight: "200",
    },
    {
      path: "../../../public/assets/fonts/yekan-bakh/YekanBakhFaNum-Light.woff2",
      weight: "300",
    },
    {
      path: "../../../public/assets/fonts/yekan-bakh/YekanBakhFaNum-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../../public/assets/fonts/yekan-bakh/YekanBakhFaNum-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../../../public/assets/fonts/yekan-bakh/YekanBakhFaNum-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../../public/assets/fonts/yekan-bakh/YekanBakhFaNum-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../../../public/assets/fonts/yekan-bakh/YekanBakhFaNum-Black.woff2",
      weight: "900",
    },
    {
      path: "../../../public/assets/fonts/yekan-bakh/YekanBakhFaNum-ExtraBlack.woff2",
      weight: "950",
    },
  ],
});

export const rokh = localFont({
  display: "swap",
  variable: "--font-rokh",
  src: [
    {
      path: "../../../public/assets/fonts/rokh/RokhFaNum-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../../public/assets/fonts/rokh/RokhFaNum-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../../../public/assets/fonts/rokh/RokhFaNum-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../../public/assets/fonts/rokh/RokhFaNum-UltraBold.woff2",
      weight: "800",
    },
    {
      path: "../../../public/assets/fonts/rokh/RokhFaNum-Black.woff2",
      weight: "900",
    },
  ],
});
