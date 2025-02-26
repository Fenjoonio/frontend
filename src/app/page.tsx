"use client";

import { PenIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/services/user";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import PullToRefreshList from "@/components/RefreshableList";
import { Story, useGetInfiniteStories } from "@/services/stories";
import CreateNewStoryDialog from "./(story)/components/CreateNewStoryDialog";

function getUserName(user: User) {
  if (user.nickname) {
    return user.nickname;
  }

  if (user.lastName && user.firstName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName || user.lastName) {
    return user.firstName || user.lastName;
  }

  return `کاربر ${user.id}#`;
}

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
    }

    setIsModalOpen(true);
  };

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <div className="flex flex-col gap-y-6">
      <PullToRefreshList onRefresh={onRefresh}>
        {stories.map((story) => (
          <div key={story.id} className="w-full py-8 px-4 not-first:border-t border-[#505050]">
            <span className="block font-bold">{getUserName(story.user)}</span>
            <p className="w-full text-[#B0B0B0] mt-2">{story.text}</p>
          </div>
        ))}

        {isPending && (
          <div className="flex flex-col gap-y-2 mt-6">
            {Array(5)
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
        <Button variant="ghost" onClick={() => fetchNextPage()}>
          صفحه بعد
        </Button>
      )}
    </div>
  );
}
