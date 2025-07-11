"use client"

import { toast } from "react-toastify";
import { Share2Icon } from "lucide-react";

export default function ProfileHeader() {
  const onShareClick = () => {
    toast.info("این قابلیت بزودی اضافه خواهد شد.");
  };

  return (
    <header
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
      className="flex items-end justify-end bg-background border-b border-border pb-3 px-2"
    >
      <div className="p-2 cursor-pointer" onClick={onShareClick}>
        <Share2Icon />
      </div>
    </header>
  );
}
