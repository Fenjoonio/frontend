"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { PaintbrushIcon } from "lucide-react";
import { getSystemTheme } from "@/lib/utils/theme";
import ToggleThemeSheet from "@/components/ToggleThemeSheet";

export default function ThemeSwitcher() {
  const { theme = "system" } = useTheme();
  const [isToggleThemeSheetOpen, setIsToggleThemeSheetOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        className="w-full flex gap-x-2 items-center py-3 px-2"
        onClick={() => setIsToggleThemeSheetOpen(true)}
      >
        <div className="bg-background rounded-[8px] p-2">
          <PaintbrushIcon className="size-5" />
        </div>

        <div className="relative">
          <span className="size-1 absolute top-0 -left-2 bg-danger rounded-sm duration-1000 animate-pulse"></span>
          <span className="text-sm mt-[2px]">حالت نمایش</span>
        </div>

        <span className="text-sm text-soft-foreground ms-auto">{getSystemTheme(theme)}</span>
      </div>

      <ToggleThemeSheet isOpen={isToggleThemeSheetOpen} onOpenChange={setIsToggleThemeSheetOpen} />
    </>
  );
}
