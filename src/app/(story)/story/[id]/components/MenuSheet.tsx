"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/classnames";
import { useDeleteStory, useGetSingleStory } from "@/services/stories";
import { EditIcon, MoreHorizontalIcon, Share2Icon, TrashIcon } from "lucide-react";
import EditStoryDialog from "@/app/(story)/components/EditStoryDialog";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import ShareStorySheet from "@/app/(story)/components/ShareStorySheet";

type MenuSheetProps = {
  storyId: number;
  className?: string;
};

export default function MenuSheet({ storyId, className }: MenuSheetProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: story } = useGetSingleStory({ id: storyId });
  const [isShareStorySheetOpen, setIsShareStorySheetOpen] = useState(false);
  const [isEditStoryDialogOpen, setIsEditStoryDialogOpen] = useState(false);
  const { mutate: deleteStory, isPending: isDeletePending } = useDeleteStory({
    onSuccess: () => {
      setIsOpen(false);
      router.push("/");
    },
  });

  const onShare = () => {
    setIsShareStorySheetOpen(true);
    setIsOpen(false);
  };

  const onEdit = () => {
    if (isDeletePending) return;
    setIsEditStoryDialogOpen(true);
  };

  const onDelete = () => {
    if (isDeletePending) return;
    deleteStory({ id: storyId });
  };

  return (
    <>
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
            <li className="flex gap-x-2 items-center py-4 cursor-pointer" onClick={onShare}>
              <Share2Icon width={20} height={20} />
              <span className="mt-[2px]">اشتراک‌گذاری</span>
            </li>

            {!!story?.isEditableByUser && (
              <li
                className={cn("flex gap-x-2 items-center py-4 cursor-pointer", {
                  "opacity-50": isDeletePending,
                })}
                onClick={onEdit}
              >
                <EditIcon width={20} height={20} />
                <span className="mt-[2px]">ویرایش داستان</span>
              </li>
            )}

            {!!story?.isDeletableByUser && (
              <li
                className={cn("flex gap-x-2 items-center py-4 cursor-pointer", {
                  "opacity-50": isDeletePending,
                })}
                onClick={onDelete}
              >
                <TrashIcon width={20} height={20} className="text-[#C46B5A]" />
                <span className="text-[#C46B5A] mt-[6px]">حذف داستان</span>
              </li>
            )}
          </ul>
        </SheetContent>
      </Sheet>

      <EditStoryDialog
        storyId={storyId}
        open={isEditStoryDialogOpen}
        onOpenChange={setIsEditStoryDialogOpen}
        onEdit={() => setIsOpen(false)}
      />

      <ShareStorySheet
        storyId={storyId}
        isOpen={isShareStorySheetOpen}
        onOpenChange={setIsShareStorySheetOpen}
      />
    </>
  );
}
