"use client";

import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Story, { StorySkeleton } from "@/app/(story)/components/Story";
import { useChangeStoryVisibility, useGetSingleStory } from "@/services/stories";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type StoryVisibilityChangeSheetProps = {
  storyId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function StoryVisibilityChangeSheet({
  storyId,
  isOpen,
  onOpenChange,
}: StoryVisibilityChangeSheetProps) {
  const { data: story, isPending: isStoryPending } = useGetSingleStory({ id: storyId });
  const { mutate } = useChangeStoryVisibility(
    { id: storyId },
    {
      onSuccess: () => {
        onOpenChange(false);
        toast.success("وضعیت نمایش داستان با موفقیت تغییر کرد");
      },
    },
  );

  const description = story?.isPrivate
    ? "با انجام این کار، داستان شما به صورت همگانی در فنجون قابل مشاهده خواهد بود."
    : "با انجام این کار، هیجکس جز شما قادر به دیدن این داستان نخواهد بود.";

  const changeStoryVisibility = async () => {
    if (!story?.id) return;
    mutate({ id: story.id, isPrivate: !story.isPrivate });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>تغییر وضعیت به حالت نمایش {story?.isPrivate ? "همگانی" : "خصوصی"}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="bg-soft-background pointer-events-none p-5 rounded-lg my-5">
          {story ? (
            <Story story={story} showProfile={false} showActions={false} />
          ) : (
            <StorySkeleton />
          )}
        </div>

        <SheetFooter className="flex gap-x-2 items-end pb-5">
          <SheetClose asChild>
            <Button variant="outline" className="basis-24">
              بستن
            </Button>
          </SheetClose>

          <Button
            type="submit"
            disabled={isStoryPending}
            className="flex-1"
            onClick={changeStoryVisibility}
          >
            تغییر وضعیت نمایش
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
