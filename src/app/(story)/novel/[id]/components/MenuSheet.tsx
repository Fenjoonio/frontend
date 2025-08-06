"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { EditIcon, FlagIcon, MoreHorizontalIcon, Share2Icon } from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { useGetNovelById } from "@/services/novels";
import { useParams } from "next/navigation";
import Link from "next/link";

type MenuSheetProps = {
  className?: string;
};

export default function MenuSheet({ className }: MenuSheetProps) {
  const params = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const { data: novel } = useGetNovelById({ id: +params.id });

  const onReport = () => {
    toast.info("این قابلیت بزودی اضافه خواهد شد.");
    setIsOpen(false);
  };

  const onShare = () => {
    toast.info("این قابلیت بزودی اضافه خواهد شد.");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={className} onClick={() => setIsOpen(true)}>
        <MoreHorizontalIcon />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="sr-only">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <ul className="divide-y divide-border px-5">
          <li className="flex gap-x-2 items-center py-4 cursor-pointer" onClick={onReport}>
            <FlagIcon className="size-5" />
            <span className="mt-[2px]">گزارش</span>
          </li>

          <li className="flex gap-x-2 items-center py-4 cursor-pointer" onClick={onShare}>
            <Share2Icon className="size-5" />
            <span className="mt-[2px]">اشتراک‌گذاری</span>
          </li>

          {!!novel?.isEditableByUser && (
            <li>
              <Link href={`/novel/${params.id}/info`} className="flex gap-x-2 items-center py-4">
                <EditIcon className="size-5" />
                <span className="mt-[2px]">ویرایش داستان</span>
              </Link>
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
