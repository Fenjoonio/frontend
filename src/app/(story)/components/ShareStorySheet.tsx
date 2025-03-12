"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import StorySharePreview from "./StorySharePreview";
import { useGetSingleStory, useShareStory } from "@/services/stories";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useShare from "@/hooks/useShare";

type ShareStorySheetProps = {
  storyId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ShareStorySheet({ storyId, isOpen, onOpenChange }: ShareStorySheetProps) {
  const { share } = useShare();
  const [imageBlob, setImageBlob] = useState<Blob>();
  const { data: story, isPending: isStoryPending } = useGetSingleStory({ id: storyId });
  const { mutate } = useShareStory();

  const shareStory = async () => {
    if (!imageBlob || !story?.text || !story.id) return;

    mutate({ id: story.id });
    share({
      text: story.text,
      files: [new File([imageBlob], `fenjoon-story-${story.id}.png`, { type: imageBlob?.type })],
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>اشتراک‌گذاری</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        {isStoryPending ? (
          <div className="bg-[#505050]/20 aspect-square rounded-lg animate-pulse"></div>
        ) : (
          <StorySharePreview
            storyId={storyId}
            className="border border-[#505050] rounded-sm overflow-hidden select-none"
            onImageCreate={setImageBlob}
          />
        )}

        <SheetFooter className="flex gap-x-2 items-end pb-5">
          <SheetClose asChild>
            <Button variant="outline" className="basis-24">
              بستن
            </Button>
          </SheetClose>

          <Button type="submit" className="flex-1" onClick={shareStory}>
            اشتراک‌گذاری
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
