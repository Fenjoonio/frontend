"use client";

import { cn } from "@/lib/utils/classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import Story from "@/app/(story)/components/Story";
import { useGetAuthorOtherStories } from "@/services/stories";

type AuthorOtherStoriesProps = {
  storyId: number;
  className?: string;
};

export default function AuthorOtherStories({ storyId, className }: AuthorOtherStoriesProps) {
  const { data: authorOtherStories } = useGetAuthorOtherStories({ id: storyId });

  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className="text-sm ps-5">سایر داستان‌های این نویسنده</h2>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={16}
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        className="w-full mt-4"
      >
        {authorOtherStories?.map((story) => (
          <SwiperSlide key={story.id} className="h-auto bg-soft-background py-5 px-4 rounded-md">
            <Story story={story} className="[&_a_p]:h-36" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
