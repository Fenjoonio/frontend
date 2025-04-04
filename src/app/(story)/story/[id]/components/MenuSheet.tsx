"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/classnames";
import EditStoryDialog from "@/app/(story)/components/EditStoryDialog";
import { useDeleteStory, useGetSingleStory } from "@/services/stories";
import ShareStorySheet from "@/app/(story)/components/ShareStorySheet";
import ReportStoryDialog from "@/app/(story)/components/ReportStoryDialog";
import { EditIcon, FlagIcon, MoreHorizontalIcon, Share2Icon, TrashIcon } from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

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
  const [isReportStoryDialogOpen, setIsReportStoryDialogOpen] = useState(false);
  const { mutate: deleteStory, isPending: isDeletePending } = useDeleteStory({
    onSuccess: () => {
      setIsOpen(false);
      router.push("/");
    },
  });

  const onReport = () => {
    setIsReportStoryDialogOpen(true);
    setIsOpen(false);
  };

  const onShare = () => {
    setIsShareStorySheetOpen(true);
    setIsOpen(false);
  };

  const onEdit = () => {
    setIsEditStoryDialogOpen(true);
    setIsOpen(false);
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

          <ul className="divide-y divide-border px-5">
            <li className="flex gap-x-2 items-center py-4 cursor-pointer" onClick={onReport}>
              <FlagIcon className="size-5" />
              <span className="mt-[2px]">گزارش</span>
            </li>

            <li className="flex gap-x-2 items-center py-4 cursor-pointer" onClick={onShare}>
              <Share2Icon className="size-5" />
              <span className="mt-[2px]">اشتراک‌گذاری</span>
            </li>

            {!!story?.isEditableByUser && (
              <li className="flex gap-x-2 items-center py-4 cursor-pointer" onClick={onEdit}>
                <EditIcon className="size-5" />
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
                <TrashIcon className="size-5 text-danger" />
                <span className="text-danger mt-[6px]">حذف داستان</span>
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

      <ReportStoryDialog
        id={storyId}
        isOpen={isReportStoryDialogOpen}
        onOpenChange={setIsReportStoryDialogOpen}
      />
    </>
  );
}
