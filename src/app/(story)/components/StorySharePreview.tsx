"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/classnames";
import { getUserName } from "@/lib/utils/users";
import { useToBlob } from "@hugocxl/react-to-image";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { Story, useGetSingleStory } from "@/services/stories";
import { HeartIcon, MessageSquareTextIcon } from "lucide-react";

type ImageTemplateProps = {
  story: Story;
  className?: string;
  onImageCreate: (blob: Blob) => void;
};

function ImageTemplate({ story, className, onImageCreate }: ImageTemplateProps) {
  const [, toBlob, ref] = useToBlob({
    backgroundColor: "#2e2e2e",
    onSuccess: (image) => onImageCreate(image!),
  });

  useEffect(() => {
    toBlob();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userName = getUserName(story.user);

  return (
    <div className={className}>
      <div
        ref={ref}
        className="w-full h-full min-w-[1024px] min-h-[1024px] flex justify-center items-center relative"
      >
        <div className="flex gap-x-4">
          <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-[#9C6B4A]">
            <div className="w-5 h-5 flex justify-center items-center overflow-hidden text-xl font-bold">
              {userName[0]}
            </div>
          </div>
          <div className="max-w-[544px] flex-1 mt-3">
            <div>
              <div className="flex gap-x-2 items-center">
                <span className="text-2xl font-semibold">{userName}</span>
                <span className="w-1 h-1 bg-[#505050] rounded-lg -mt-1"></span>
                <span className="text-[18px] text-[#B0B0B0]">
                  {formatStoryCreateAt(story.createdAt)}
                </span>
              </div>
              <p className="w-full text-2xl text-[#B0B0B0] whitespace-pre-line line-clamp-6 mt-2">
                {story.text}
              </p>
            </div>
            <div className="flex gap-x-5 mt-4">
              <div className="flex gap-x-3 items-center">
                <HeartIcon
                  className={cn("w-6 h-6 text-[#B0B0B0]", {
                    "fill-[#C46B5A] stroke-[#C46B5A]": story.isLikedByUser,
                  })}
                />
                <span className="text-[20px] text-[#B0B0B0]">{story.likesCount || "۰"}</span>
              </div>
              <div className="flex gap-x-3 items-center">
                <MessageSquareTextIcon className="w-6 h-6 text-[#B0B0B0]" />
                <span className="text-[20px] text-[#B0B0B0]">{story.commentsCount || "۰"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between absolute bottom-16 right-0 px-20">
          <h1 className="text-3xl font-extrabold">فـــ</h1>
          {/* <span className="text-[12px] text-[#B0B0B0] font-sans font-extrabold">Fenjoon.io</span> */}
        </div>
      </div>
    </div>
  );
}

type StorySharePreviewProps = {
  storyId: number;
  className?: string;
  onImageCreate: (imageBlob: Blob) => void;
};

export default function StorySharePreview({
  storyId,
  className,
  onImageCreate,
}: StorySharePreviewProps) {
  const [imageUrl, setImageUrl] = useState("");
  const { data: story } = useGetSingleStory({ id: storyId });

  if (!story) {
    return <div className="bg-[#505050]/20 aspect-square rounded-lg animate-pulse"></div>;
  }

  const onPreviewImageCreate = (imageBlob: Blob) => {
    setImageUrl(URL.createObjectURL(imageBlob));
    onImageCreate(imageBlob);
  };

  return (
    <>
      <div className={cn("aspect-square relative", className)}>
        {!!imageUrl && <Image src={imageUrl} alt="پیش نمایش تصویر" fill />}
      </div>

      <ImageTemplate
        story={story}
        className="fixed -top-[9999px] -left-[9999px]"
        onImageCreate={onPreviewImageCreate}
      />
    </>
  );
}
