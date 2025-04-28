"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils/classnames";
import { Progress } from "@/components/ui/progress";
import { useGetUserPrivateStoryCount } from "@/services/user";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

type UserPrivateStoryCountProps = {
  className?: string;
};

export default function UserPrivateStoryCount({ className }: UserPrivateStoryCountProps) {
  const { data } = useGetUserPrivateStoryCount();

  const max = data?.max || 0;
  const count = data?.count || 0;

  const progress = useMemo(() => 100 - (count / max) * 100 || 0, [count, max]);

  if (data?.max === -1) {
    return;
  }

  return (
    <div className={cn("flex gap-y-3 flex-col", className)}>
      <div className="flex items-center justify-between">
        <span>تعداد داستان‌های خصوصی باقی مانده:</span>

        <span className="text-sm text-soft-foreground">
          {max} / {max - count}
        </span>
      </div>

      <Progress value={progress} />

      <Link
        href="https://survey.porsline.ir/s/ClQJisEC"
        className="flex gap-x-2 items-center text-warning mt-3"
      >
        <InfoIcon className="size-5" />
        <span className="text-sm mt-0.5">
          برای ایجاد داستان خصوصی بیشتر، از <span className="underline">اینجا</span> اشتراک حرفه‌ای
          خریداری کنید.
        </span>
      </Link>
    </div>
  );
}
