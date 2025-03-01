"use client";

import Link from "next/link";
import Image from "next/image";
import { PenIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerImage from "../../public/images/banner.png";
import { useAuthContext } from "@/providers/AuthProvider";
import PullToRefreshList from "@/components/RefreshableList";
import { Story, useGetInfiniteStories } from "@/services/stories";
import CreateNewStoryDialog from "./(story)/components/CreateNewStoryDialog";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, refetch, fetchNextPage, hasNextPage, isPending } = useGetInfiniteStories({
    page: 1,
    limit: 5,
  });

  const stories = useMemo<Story[]>(() => {
    return data?.pages ? data.pages.flatMap((page) => page.stories ?? []) : [];
  }, [data?.pages]);

  const openAddStoryModalIfLoggedIn = () => {
    if (!isLoggedIn) {
      router.push("/accounts/login?redirect=/");
      return;
    }

    setIsModalOpen(true);
  };

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <div className="pb-4">
      <header className="h-20 flex items-end bg-[#3a3a3a] px-5 pb-4">
        <h1 className="text-xl font-extrabold">فنجون</h1>
      </header>

      <Swiper loop className="mt-4">
        <SwiperSlide className="px-5">
          <div className="w-full h-40 relative">
            <Image src={BannerImage} alt="الان وقتشه" fill />
          </div>
        </SwiperSlide>

        <SwiperSlide className="px-5">
          <div className="w-full h-40 relative">
            <Image src={BannerImage} alt="الان وقتشه" fill />
          </div>
        </SwiperSlide>
      </Swiper>

      <PullToRefreshList onRefresh={onRefresh}>
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/story/${story.id}`}
            className="w-full block py-8 px-5 not-first:border-t border-[#505050]"
          >
            <span className="block font-bold">{getUserName(story.user)}</span>
            <p className="w-full text-[#B0B0B0] whitespace-pre-line line-clamp-5 mt-2">
              {story.text}
            </p>
          </Link>
        ))}

        {isPending && (
          <div className="flex flex-col gap-y-2 mt-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="p-4">
                  <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
                  <div className="w-full h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
                  <div className="w-[80%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
                </div>
              ))}
          </div>
        )}
      </PullToRefreshList>

      <CreateNewStoryDialog open={isModalOpen} onOpenChange={setIsModalOpen} />

      <button
        className="fixed bottom-20 left-4 p-4 bg-[#9C6B4A] rounded-lg cursor-pointer"
        onClick={openAddStoryModalIfLoggedIn}
      >
        <PenIcon className="w-5 h-5" />
      </button>

      {hasNextPage && (
        <Button variant="ghost" className="w-full px-4" onClick={() => fetchNextPage()}>
          صفحه بعد
        </Button>
      )}
    </div>
  );
}
