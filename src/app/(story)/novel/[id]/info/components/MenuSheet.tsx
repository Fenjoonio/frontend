"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/classnames";
import { MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useDeleteNovel, useGetNovelById } from "@/services/novels";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

type MenuSheetProps = {
  novelId: number;
  className?: string;
};

export default function MenuSheet({ novelId, className }: MenuSheetProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: novel } = useGetNovelById({ id: novelId });
  const { mutate: deleteNovel, isPending: isDeletePending } = useDeleteNovel({
    onSuccess: () => {
      setIsOpen(false);
      router.replace("/profile/novels");
      toast.success("داستان شما با موفقیت حذف شد");
    },
  });

  const onDelete = () => {
    if (isDeletePending) return;
    deleteNovel({ id: novelId });
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
          {!!novel?.isDeletableByUser && (
            <li
              className={cn("flex gap-x-2 items-center py-4 cursor-pointer", {
                "opacity-50": isDeletePending,
              })}
              onClick={onDelete}
            >
              <TrashIcon className="size-5 text-danger" />
              <span className="text-danger mt-[6px]">حذف داستان</span>
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
