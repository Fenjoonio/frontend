"use client";

import { useTheme } from "next-themes";
import { CheckIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type ToggleThemeSheetProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ToggleThemeSheet({ isOpen, onOpenChange }: ToggleThemeSheetProps) {
  const { theme, setTheme } = useTheme();

  const selectTheme = (theme: string) => {
    setTheme(theme);
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="pb-4">
        <SheetHeader>
          <SheetTitle>حالت نمایش</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <ul className="divide-y divide-border">
          <li
            className="flex gap-x-2 items-center py-4 cursor-pointer"
            onClick={() => selectTheme("light")}
          >
            <SunIcon className="size-5 text-soft-foreground" />
            <span>روشن</span>

            {theme === "light" && <CheckIcon className="size-5 ms-auto" />}
          </li>

          <li
            className="flex gap-x-2 items-center py-4 cursor-pointer"
            onClick={() => selectTheme("dark")}
          >
            <MoonIcon className="size-5 text-soft-foreground" />
            <span>تاریک</span>

            {theme === "dark" && <CheckIcon className="size-5 ms-auto" />}
          </li>

          <li
            className="flex gap-x-2 items-center py-4 cursor-pointer"
            onClick={() => selectTheme("system")}
          >
            <SunMoonIcon className="size-5 text-soft-foreground" />
            <span>پیروی از سیستم</span>

            {theme === "system" && <CheckIcon className="size-5 ms-auto" />}
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
