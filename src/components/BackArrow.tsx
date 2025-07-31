"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/classnames";
import { ArrowRightIcon } from "lucide-react";

type BackArrowProps = {
  className?: string;
};

export default function BackArrow({ className }: BackArrowProps) {
  return (
    <div
      className={cn("size-10 flex justify-center items-center cursor-pointer", className)}
      onClick={useRouter().back}
    >
      <ArrowRightIcon />
    </div>
  );
}
