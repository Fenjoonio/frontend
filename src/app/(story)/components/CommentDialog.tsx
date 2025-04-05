import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddStoryComment } from "@/services/stories";
import { useState } from "react";

type CommentDialogProps = {
  id: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CommentDialog({ id, isOpen, onOpenChange }: CommentDialogProps) {
  const [text, setText] = useState("");
  const { mutate, isPending } = useAddStoryComment({
    onSuccess: () => {
      onOpenChange(false);
      setText("");
    },
  });

  const comment = () => {
    mutate({ id, text });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="h-svh">
        <DialogHeader>
          <DialogTitle>نقد شما</DialogTitle>
          <DialogDescription>از این داستان چه حسی گرفتی؟</DialogDescription>
        </DialogHeader>

        <textarea
          value={text}
          placeholder="خیلی قشنگه و به‌نظرم می‌تونه ..."
          className="h-40 p-4 resize-none border border-border outline-none rounded-lg"
          onChange={(e) => setText(e.target.value)}
        />

        <DialogFooter className="flex gap-x-2 items-end pb-5">
          <DialogClose asChild>
            <Button variant="outline" className="basis-24">
              بستن
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isPending} className="flex-1" onClick={comment}>
            ثبت نقد
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
