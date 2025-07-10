"use client";

import { PenIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BackArrow from "@/components/BackArrow";
import { getUserName } from "@/lib/utils/users";
import PullToRefresh from "@/components/PullToRefresh";
import { sendGAEvent } from "@next/third-parties/google";
import { useAuthContext } from "@/providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateNewStoryDialog from "./components/CreateNewStoryDialog";
import Story, { StorySkeleton } from "@/app/(story)/components/Story";
import { useGetCampaignLeaderboard, useGetCampaignStories } from "@/services/campaigns";
import UserAvatar from "@/components/UserAvatar";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, refetch, fetchNextPage, hasNextPage, isFetching } = useGetCampaignStories({
    page: 1,
    limit: 10,
  });

  const stories = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.stories ?? []) : [];
  }, [data?.pages]);

  const { data: leaderboard, isFetching: isLeaderboardFetching } = useGetCampaignLeaderboard();

  const openAddStoryModalIfLoggedIn = () => {
    if (!isLoggedIn) {
      router.push("/accounts/login?redirect=/");
      return;
    }

    setIsModalOpen(true);
    sendGAEvent("add_story", "click", { location: "home" });
  };

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <div className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">مسابقه یک فنجون داستان</h1>
      </header>

      <div className="px-5 mt-4">
        <span className="block text-sm text-soft-foreground mt-1">
          به اولین مسابقه داستان نویسی فنجون خوش اومدید!
        </span>
      </div>

      <h3 className="text-sm text-soft-foreground mt-6 px-5">قوانین مسابقه</h3>

      <ol className="flex gap-y-1 flex-col mt-4 px-5">
        <li>۱. تمامی داستان‌ها باید بین 25 تا نهایتا ۲۰۰۰ حرف باشند.</li>
        <li>
          ۲. داستان‌ها باید با موضوع اصلی عشق یا موضوعات انتقام، نفرت و صداقت نوشته شوند. داستان‌های
          نامربوط از صفحه مسابقه حذف می‌شوند.
        </li>
        <li>
          ۳. داستان‌ها می‌بایست عاری از هرگونه موضوعات حساس سیاسی، قومیتی و موارد خلاف شئونات اخلاقی
          باشد.
        </li>
        <li>۴. هر فرد برای شرکت در این مسابقه می‌تواند تنها یک داستان منتشر کند.</li>
        <li>۵. استفاده از تمامی ژانرها آزاد است.</li>
        <li>۶. تمامی آثار باید در قالب داستان کوتاه باشند.</li>
        <li>۷. داستان باید برای تمامی رده‌های سنی قابل نمایش باشد.</li>
      </ol>

      <h3 className="text-sm text-soft-foreground mt-6 px-5">نفرات برتر</h3>

      <div className="px-5 mt-4">
        {isLeaderboardFetching
          ? Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex gap-x-2 pb-2 not-first:pt-2">
                  <div>
                    <div className="size-11 bg-gray-300 dark:bg-border opacity-40 rounded-lg animate-pulse"></div>
                  </div>

                  <div className="flex-1 mt-1">
                    <div className="w-20 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse"></div>
                    <div className="w-10 h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-1"></div>
                  </div>
                </div>
              ))
          : leaderboard?.map((item) => (
              <div key={item.user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-x-2 pb-4 not-first:pt-4">
                  <UserAvatar user={item.user} className="size-11" />
                  <div className="flex gap-y-1 flex-col justify-center">
                    <span className="text-sm font-bold">{getUserName(item.user)}</span>
                    <span className="text-xs text-soft-foreground">{item.totalLikes} لایک</span>
                  </div>
                </div>

                <span>{item.rank}</span>
              </div>
            ))}
      </div>

      <h3 className="text-sm text-soft-foreground mt-6 px-5">لیست جوایز</h3>

      <ol className="flex gap-y-1 flex-col mt-4 px-5">
        <li>نفر اول: جایزه نقدی + کتاب +‌ اکانت حرفه‌ای فنجون</li>
        <li>نفر دوم: کتاب + اکانت حرفه‌ای فنجون</li>
        <li>نفر نفر سوم: اکانت حرفه‌ای فنجون</li>
      </ol>

      <h3 className="text-sm text-soft-foreground mt-6 px-5">آخرین داستان‌ها</h3>

      <PullToRefresh onRefresh={onRefresh} className="mx-5 mt-4">
        <InfiniteScroll
          next={fetchNextPage}
          dataLength={stories.length}
          hasMore={isFetching || hasNextPage}
          loader={
            <>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <StorySkeleton key={index} className="pb-6 not-first:pt-6" />
                ))}
            </>
          }
          className="divide-y divide-border"
        >
          {stories.map((story) => (
            <Story key={story.id} story={story} className="flex gap-x-2 pb-6 not-first:pt-6" />
          ))}
        </InfiniteScroll>
      </PullToRefresh>

      <CreateNewStoryDialog open={isModalOpen} onOpenChange={setIsModalOpen} />

      <button
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
        className="fixed left-4 p-4 bg-primary text-light-gray-100 rounded-lg cursor-pointer"
        onClick={openAddStoryModalIfLoggedIn}
      >
        <PenIcon className="size-5" />
      </button>
    </div>
  );
}
