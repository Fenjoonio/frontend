"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useReportStory } from "@/services/stories";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const reasons = [
  {
    key: "misinformation",
    title: "اطلاعات نادرست یا گمراه‌کننده",
    description:
      "داستان اطلاعاتی را منتشر می‌کند که اشتباه یا گمراه‌کننده بوده و ممکن است به دیگران آسیب بزند",
  },
  {
    key: "inappropriate_content",
    title: "محتوای نامناسب یا غیراخلاقی",
    description: "داستان شامل صحنه‌های خشونت‌آمیز، جنسی، یا محتوای نامناسب دیگر است",
  },
  {
    key: "spam_or_ads",
    title: "اسپم یا تبلیغات",
    description: "داستان شامل تبلیغات، لینک، یا محتوای نامرتبط با داستان‌نویسی است",
  },
  {
    key: "plagiarism",
    title: "سرقت ادبی یا نقض کپی‌رایت",
    description: "داستان بدون اجازه یا ذکر منبع از جای دیگری کپی شده است",
  },
  {
    key: "other",
    title: "موارد دیگر",
    description: "اگر داستان به هر دلیل دیگری نامناسب به نظر می‌رسد، می‌توانید آن را گزارش کنید",
  },
];

type ReportStoryDialogProps = {
  id: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReportStoryDialog({ id, isOpen, onOpenChange }: ReportStoryDialogProps) {
  const [reasonTitle, setReasonTitle] = useState("");
  const { mutate: reportStory, isPending: isReportStoryPending } = useReportStory({
    onSuccess: () => {
      onOpenChange(false);
      setReasonTitle("");
    },
  });

  const report = () => {
    if (!reasonTitle) return;

    reportStory({ id, reason: reasonTitle });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full">
        <DialogHeader>
          <DialogTitle>گزارش</DialogTitle>
          <DialogDescription>این داستان رو مناسب فضای فنجون نمی‌دونم چون:</DialogDescription>
        </DialogHeader>

        <RadioGroup className="flex gap-y-6 flex-col" onValueChange={(e) => setReasonTitle(e)}>
          {reasons.map((reason) => (
            <div key={reason.key} className="flex gap-x-2">
              <RadioGroupItem id={reason.key} value={reason.title} />

              <label htmlFor={reason.key} className="flex gap-y-1 flex-col">
                <span className="text-sm">{reason.title}</span>
                <span className="text-sm text-soft-foreground mt-1">{reason.description}</span>
              </label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter className="flex gap-x-2 items-end pb-5">
          <DialogClose asChild>
            <Button variant="outline" className="basis-24">
              بستن
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isReportStoryPending} className="flex-1" onClick={report}>
            ثبت گزارش
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
