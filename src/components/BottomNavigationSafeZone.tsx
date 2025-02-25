"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";

export default function BottomNavigationSafeZone({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const hidePages = [
    "/gold",
    "/wallet/deposit",
    "/wallet/withdraw",
    "/accounts",
    "/onboarding",
    "/receipt",
  ];
  const isHidden = hidePages.some((page) => pathname.includes(page));

  if (isHidden) {
    return children;
  }

  return (
    <div className="pb-safe-16">
      <div className="min-h-svh">{children}</div>
      <BottomNavigation
        pathname={pathname}
        className="max-w-[480px] fixed bottom-0 left-0 right-0 z-10 mx-auto"
      />
    </div>
  );
}
