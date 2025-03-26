"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type Comment } from "@/services/comments";
import { useEditComment } from "@/services/comments/hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EditCommentDialogProps = {
  open: boolean;
  comment: Comment;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (res: Comment) => void;
};

// TODO: Get comment from api
export default function EditCommentDialog({
  comment,
  open,
  onOpenChange,
  onSuccess,
}: EditCommentDialogProps) {
  const [text, setText] = useState(comment.text);
  const { mutate, isPending } = useEditComment({ id: comment.id }, { onSuccess });

  const edit = () => {
    mutate({ id: comment.id, text });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-svh bg-[#2e2e2e] text-[#e0e0e0]">
        <DialogHeader>
          <DialogTitle>ویرایش نقد</DialogTitle>
          <DialogDescription>
            متن نقد خودتون رو وارد کنید (دقت کن که متن نقد بین ۵ تا نهایتا ۲۵۰ حرف باشه)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <textarea
            value={text}
            placeholder="خیلی قشنگه و به‌نظرم می‌تونه ..."
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

          <Button type="submit" disabled={isPending} className="flex-1" onClick={edit}>
            ویرایش نقد
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
