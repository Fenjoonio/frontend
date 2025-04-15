"use client";

import { cn } from "@/lib/utils/classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAuthorOtherStories } from "@/services/stories";
import Story, { StorySkeleton } from "@/app/(story)/components/Story";

type AuthorOtherStoriesProps = {
  storyId: number;
  className?: string;
};

export default function AuthorOtherStories({ storyId, className }: AuthorOtherStoriesProps) {
  const { data: stories, isFetching, isError } = useGetAuthorOtherStories({ id: storyId });

  if (!stories?.length && !isFetching) {
    return;
  }

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
        {isFetching || isError ? (
          <>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <SwiperSlide key={index} className="h-auto bg-soft-background py-5 px-4 rounded-md">
                  <StorySkeleton className="h-36" />
                </SwiperSlide>
              ))}
          </>
        ) : (
          stories?.map((story) => (
            <SwiperSlide key={story.id} className="h-auto bg-soft-background py-5 px-4 rounded-md">
              <Story story={story} className="[&_a_p]:line-clamp-3 [&_a_p]:h-[68px]" />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
}
