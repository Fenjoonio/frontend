"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAddStoryComment } from "@/services/stories";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ReplySheetProps = {
  open: boolean;
  storyId: number;
  onOpenChange: any;
};

export default function ReplySheet({ storyId, open, onOpenChange }: ReplySheetProps) {
  const [text, setText] = useState("");
  const { mutate, isPending } = useAddStoryComment({
    onSuccess: () => {
      setText("");
      onOpenChange(false);
    },
  });

  const createNewStory = () => {
    mutate({ id: String(storyId), text });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-svh bg-background">
        <DialogHeader>
          <DialogTitle>داستان جدید</DialogTitle>
          <DialogDescription>
            متن داستانک خودتون رو وارد کنید (دقت کن که متن داستان بین ۵۰ تا نهایتا ۲۵۰ حرف باشه)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <textarea
            value={text}
            placeholder="داستان از این قراره که ..."
            className="h-80 p-4 resize-none border border-border rounded-lg"
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <DialogFooter className="flex gap-x-2 items-end">
          <DialogClose asChild>
            <Button variant="outline" className="basis-24">
              بستن
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isPending} className="flex-1" onClick={createNewStory}>
            ثبت داستان
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
