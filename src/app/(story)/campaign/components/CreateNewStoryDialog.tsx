"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils/classnames";
import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendGAEvent } from "@next/third-parties/google";
import { useWriteStoryWithAi } from "@/services/stories";
import { randomNumberBetween } from "@/lib/utils/numbers";
import { useAddCampaignStory } from "@/services/campaigns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const placeholders = [
  `هر روز همون میز، همون صندلی، همون قهوه.
فقط اون دیگه نمیاد.`,
  `قهوه‌اش سرد شده بود، نگاهش هنوز داغ.
گفتم: منتظر کی بودی؟
گفت: یکی که قول نداده بود، ولی همیشه می‌اومد`,
  `بارون گرفته بود و همه دنبال سقف بودن.
اون ولی، دست‌هاش رو باز کرده بود!
«اگه قرار خیس بشم، بذار کامل خیس شم…»`,
];

type CreateNewStoryDialogProps = {
  open: boolean;
  onOpenChange: any;
};

export default function CreateNewStoryDialog({ open, onOpenChange }: CreateNewStoryDialogProps) {
  const [text, setText] = useState("");
  const { mutate: createStory, isPending: isCreateStoryPending } = useAddCampaignStory({
    onSuccess: () => {
      setText("");
      onOpenChange(false);
      sendGAEvent("event", "campaign_story_created", {});
    },
  });

  const { mutate: writeStoryWithAi, isPending: isWriteWithAiPending } = useWriteStoryWithAi({
    onSuccess: (story) => {
      setText((prevState) => `${prevState.trim()} ${story}`);
      sendGAEvent("event", "write_story_with_ai", {});
    },
    onError: () => {
      toast.error("این قابلیت در حال حاضر در دسترس نیست");
      sendGAEvent("event", "write_story_with_ai_error", {});
    },
  });

  const createNewStory = () => {
    createStory({ text: text.trim() });
  };

  const getHelpFromAi = () => {
    if (text.length < 5) {
      toast.info("برای شروع چند کلمه بنویس");
      return;
    }

    writeStoryWithAi({ text });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-svh">
        <DialogHeader>
          <DialogTitle>داستان جدید</DialogTitle>
          <DialogDescription>
            هر لحظه‌ای می‌تونه یه داستان داشته باشه؛ به اطرافت نگاه کن و داستانت رو بنویس. (از{" "}
            <span className="text-foreground">۲۵ تا ۲۰۰۰</span> حرف)
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-6">
          <Textarea
            value={text}
            maxLength={250}
            disabled={isWriteWithAiPending}
            placeholder={placeholders[randomNumberBetween(0, placeholders.length - 1)]}
            className="w-full min-h-40 p-4 resize-none border border-border rounded-lg"
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className={cn(
              "slide-out flex items-center justify-end absolute bottom-5 left-3 overflow-hidden bg-soft-background rounded-md",
              { "opacity-50": isWriteWithAiPending }
            )}
            onClick={getHelpFromAi}
          >
            <span className="h-10 flex items-center text-nowrap px-2.5 -me-2.5">
              تکمیل با هوش مصنوعی
            </span>

            <div className="relative z-10 p-2.5">
              <SparklesIcon className="size-5 text-primary" />
            </div>
          </div>
        </div>

        <span className="text-sm text-soft-foreground mt-2">
          نکته: داستان‌هایی که برای مسابقه می‌نویسید در صفحه اصلی فنجون نیز نمایش داده خواهند شد.
        </span>

        <DialogFooter className="flex gap-x-2">
          <DialogClose asChild>
            <Button variant="outline" className="basis-24">
              بستن
            </Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={isCreateStoryPending || isWriteWithAiPending}
            className="flex-1"
            onClick={createNewStory}
          >
            ثبت داستان
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
