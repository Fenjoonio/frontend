"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

export default function BackArrow() {
  return (
    <div
      className="w-10 h-10 flex justify-center items-center cursor-pointer"
      onClick={useRouter().back}
    >
      <ArrowRightIcon />
    </div>
  );
}
