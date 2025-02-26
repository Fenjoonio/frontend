"use client";

import { notFound } from "next/navigation";
import { getUserName } from "@/lib/utils/users";
import { useGetSingleStory } from "@/services/stories";

type StoryProps = {
  id: string;
};

export default function Story({ id }: StoryProps) {
  const { data, isPending, isFetched } = useGetSingleStory({ id: +id });
  const story = data?.story;

  if (isFetched && !story) {
    notFound();
  }

  if (isPending || !story) {
    return (
      <div className="w-full py-9 px-4">
        <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
        <div className="w-full h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
        <div className="w-[80%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
        <div className="w-[40%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
      </div>
    );
  }

  return (
    <div key={story.id} className="w-full py-8 px-4">
      <span className="block font-bold">{getUserName(story.user)}</span>
      <p className="w-full text-[#B0B0B0] mt-2">{story.text}</p>
    </div>
  );
}
