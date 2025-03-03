"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddNewStory } from "@/services/stories";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

type CreateNewStoryDialogProps = {
  open: boolean;
  onOpenChange: any;
};

export default function CreateNewStoryDialog({ open, onOpenChange }: CreateNewStoryDialogProps) {
  const [text, setText] = useState("");
  const { mutate, isPending } = useAddNewStory({
    onSuccess: () => {
      setText("");
      onOpenChange(false);
    },
  });

  const createNewStory = () => {
    mutate({ text });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-svh bg-[#2e2e2e] text-[#e0e0e0]">
        <DialogHeader>
          <DialogTitle>داستان جدید</DialogTitle>
          <DialogDescription>متن داستانک خودتون رو وارد کنید (حداکثر ۲۵۰ حرف)</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <textarea
            value={text}
            placeholder="داستان از این قراره که ..."
            className="h-80 p-4 resize-none border border-[#505050] rounded-lg"
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
