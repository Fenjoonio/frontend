"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/classnames";
import { useDeleteStory } from "@/services/stories";
import { MoreHorizontalIcon, TrashIcon } from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

type MenuSheetProps = {
  storyId: string;
  className?: string;
};

export default function MenuSheet({ storyId, className }: MenuSheetProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteStory, isPending } = useDeleteStory({
    onSuccess: () => {
      setIsOpen(false);
      router.push("/");
    },
  });

  const onDelete = () => {
    if (isPending) return;
    deleteStory({ id: storyId });
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
        <ul className="divide-y divide-[#505050] px-5">
          {/* <li className="flex gap-x-2 items-center py-4 cursor-pointer">
            <EditIcon width={20} height={20} />
            <span className="mt-[2px]">ویرایش داستان</span>
          </li> */}

          <li
            className={cn("flex gap-x-2 items-center py-4 cursor-pointer", {
              "opacity-50": isPending,
            })}
            onClick={onDelete}
          >
            <TrashIcon width={20} height={20} className="text-[#C46B5A]" />
            <span className="text-[#C46B5A] mt-[6px]">حذف داستان</span>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
