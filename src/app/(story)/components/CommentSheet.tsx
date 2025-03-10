import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAddStoryComment } from "@/services/stories";
import { useState } from "react";

type CommentSheetProps = {
  id: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CommentSheet({ id, isOpen, onOpenChange }: CommentSheetProps) {
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
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>نقد شما</SheetTitle>
          <SheetDescription>از این داستان چه حسی گرفتی؟</SheetDescription>
        </SheetHeader>

        <textarea
          value={text}
          placeholder="خیلی قشنگه و به‌نظرم می‌تونه ..."
          className="h-40 p-4 resize-none border border-[#505050] outline-none rounded-lg"
          onChange={(e) => setText(e.target.value)}
        />

        <SheetFooter className="flex gap-x-2 items-end pb-5">
          <SheetClose asChild>
            <Button variant="outline" className="basis-24">
              بستن
            </Button>
          </SheetClose>

          <Button type="submit" disabled={isPending} className="flex-1" onClick={comment}>
            ثبت نقد
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
