"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils/classnames";
import { getUserName } from "@/lib/utils/users";
import { useToPng } from "@hugocxl/react-to-image";
import { useGetSingleStory } from "@/services/stories";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { HeartIcon, MessageSquareTextIcon } from "lucide-react";

type StorySharePreviewProps = {
  storyId: number;
  className?: string;
  onImageCreate: (image: string) => void;
};

export default function StorySharePreview({
  storyId,
  className,
  onImageCreate,
}: StorySharePreviewProps) {
  const { data: story } = useGetSingleStory({ id: storyId });

  const [, toPNG, ref] = useToPng({
    width: 335,
    height: 335,
    canvasWidth: 1024,
    canvasHeight: 1024,
    skipAutoScale: false,
    backgroundColor: "#2e2e2e00",
    onSuccess(image) {
      onImageCreate(image);
    },
  });

  useEffect(() => {
    toPNG();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!story) {
    return;
  }

  const userName = getUserName(story.user);

  return (
    <div ref={ref} className={cn("aspect-square", className)}>
      <div className="w-full h-full min-w-[335px] min-h-[335px] flex justify-center items-center relative bg-[#2e2e2e]">
        <div
          key={story.id}
          className="w-[60%] flex gap-x-2 pb-6 not-first:pt-6 not-first:border-t border-[#505050]"
        >
          <div className="w-5 h-5 shrink-0 flex items-center justify-center rounded-[6px] bg-[#9C6B4A]">
            <div className="w-4 h-4 flex justify-center items-center overflow-hidden text-[8px] font-bold">
              {userName[0]}
            </div>
          </div>

          <div className="flex-1 mt-[4px]">
            <div>
              <div className="flex gap-x-[6px] items-center">
                <span className="text-[10px] font-bold">{getUserName(story.user)}</span>
                <span className="w-1 h-1 bg-[#505050] rounded-sm"></span>
                <span className="text-[6px] text-[#B0B0B0] mt-[2px]">
                  {formatStoryCreateAt(story.createdAt)}
                </span>
              </div>

              <p className="w-full text-[7px] text-[#B0B0B0] whitespace-pre-line line-clamp-6 leading-[140%] mt-[2px]">
                {story.text}
              </p>
            </div>

            <div className="flex items-center gap-x-2 mt-1">
              <div className="flex items-center gap-x-1">
                <HeartIcon
                  className={cn("w-2 h-2 text-[#B0B0B0]", {
                    "fill-[#C46B5A] stroke-[#C46B5A]": story.isLikedByUser,
                  })}
                />
                <span className="text-[7px] text-[#B0B0B0] mt-1">{story.likesCount || "۰"}</span>
              </div>

              <div className="flex items-center gap-x-1">
                <MessageSquareTextIcon className="w-2 h-2 text-[#B0B0B0]" />
                <span className="text-[7px] text-[#B0B0B0] mt-1">{story.commentsCount || "۰"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between absolute bottom-4 right-0 px-6">
          <span className="text-[10px] font-extrabold">فـــ</span>
          <span className="text-[5px] text-[#B0B0B0] font-sans">Fenjoon.io</span>
        </div>
      </div>
    </div>
  );
}
