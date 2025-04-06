"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { type Story, useEditStory, useGetSingleStory } from "@/services/stories";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type EditStoryDialogProps = {
  open: boolean;
  storyId: number;
  onOpenChange: any;
  onEdit?: (response: Story) => void;
};

export default function EditStoryDialog({
  storyId,
  open,
  onOpenChange,
  onEdit,
}: EditStoryDialogProps) {
  const { data: story, isPending: isGetStoryPending } = useGetSingleStory({ id: storyId });

  const [text, setText] = useState(() => story?.text || "");
  const { mutate, isPending: isEditStoryPending } = useEditStory(
    { id: story?.id || storyId },
    {
      onSuccess: (response) => {
        setText(response.text || "");
        onOpenChange(false);
        onEdit?.(response);
      },
    }
  );

  useEffect(() => {
    if (story?.text) {
      setText(story.text);
    }
  }, [story]);

  const editStory = () => {
    mutate({ id: story?.id || storyId, text });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-svh bg-background">
        <DialogHeader>
          <DialogTitle>ویرایش داستان</DialogTitle>
          <DialogDescription>
            یادت نره که متن داستان باید از ۵۰ تا نهایتا ۲۵۰ حرف باشه
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <Textarea
            value={text}
            maxLength={250}
            placeholder="داستان از این قراره که ..."
            className="w-full min-h-40 p-4 resize-none border border-border rounded-lg"
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <DialogFooter className="flex gap-x-2 items-end">
          <DialogClose asChild>
            <Button variant="outline" className="basis-24">
              بستن
            </Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={isGetStoryPending || isEditStoryPending}
            className="flex-1"
            onClick={editStory}
          >
            ویرایش داستان
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
