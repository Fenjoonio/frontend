"use client";

import { User } from "@/services/user";
import { useMemo, useState } from "react";
import { Story, useGetInfiniteStories } from "@/services/stories";
import CreateNewStoryDialog from "./(story)/components/CreateNewStoryDialog";
import { PenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PullToRefreshList from "@/components/RefreshableList";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, refetch, fetchNextPage, hasNextPage } = useGetInfiniteStories({
    page: 1,
    limit: 4,
  });

  const stories = useMemo<Story[]>(() => {
    return data?.pages ? data.pages.flatMap((page) => page.stories ?? []) : [];
  }, [data?.pages]);

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <div className="flex gap-y-6 flex-col">
      <PullToRefreshList onRefresh={onRefresh}>
        {stories.map((story) => (
          <div key={story.id} className="w-full p-4 not-first:border-t border-[#505050]">
            <span className="block font-bold">{getUserName(story.user)}</span>
            <p className="w-full text-[#B0B0B0] mt-2">{story.text}</p>
          </div>
        ))}
      </PullToRefreshList>

      <CreateNewStoryDialog open={isModalOpen} onOpenChange={setIsModalOpen} />

      <button
        className="fixed bottom-20 left-4 p-4 bg-[#9C6B4A] rounded-lg"
        onClick={() => setIsModalOpen(true)}
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
