"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils/classnames";
import { getUserName } from "@/lib/utils/users";
import { useGetSingleStory } from "@/services/stories";

type StoryProps = {
  id: string;
};

export default function Story({ id }: StoryProps) {
  const [showFullText, setShowFullText] = useState(false);
  const { data: story, isPending, isFetched } = useGetSingleStory({ id: +id });
  const hasStory = story && Object.keys(story).length;

  if (isFetched && !hasStory) {
    notFound();
  }

  if (isPending || !hasStory) {
    return (
      <div className="w-full p-5">
        <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
        <div className="w-full h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
        <div className="w-[80%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
        <div className="w-[40%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
      </div>
    );
  }

  return (
    <div key={story.id} className="w-full p-5">
      <span className="block font-bold">{getUserName(story.user)}</span>
      <p
        className={cn("w-full text-[#B0B0B0] whitespace-pre-line mt-2", {
          "line-clamp-6": !showFullText,
        })}
        onClick={() => setShowFullText(!showFullText)}
      >
        {story.text}
      </p>

      {story.text.split("\n").length > 6 && (
        <span
          className="block text-center cursor-pointer mt-10"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "نمایش بخشی از داستان" : "نمایش تمام داستان"}
        </span>
      )}
    </div>
  );
}
