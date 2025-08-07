"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import { SendIcon, UserPlusIcon } from "lucide-react";
import { useFollow, useGetUserById, useUnfollow } from "@/services/user";
import UserFollowersListSheet from "@/app/(user)/components/UserFollowersListSheet";
import UserFollowingsListSheet from "@/app/(user)/components/UserFollowingsListSheet";

type UserInfoProps = {
  id: number;
  className?: string;
};

export default function UserInfo({ id, className }: UserInfoProps) {
  const [isFollowersSheetOpen, setIsFollowersSheetOpen] = useState(false);
  const [isFollowingsSheetOpen, setIsFollowingsSheetOpen] = useState(false);

  const { data: user } = useGetUserById({ id });
  const { mutate: follow, isPending: isFollowPending } = useFollow();
  const { mutate: unfollow, isPending: isUnfollowPending } = useUnfollow();

  if (!user) {
    return (
      <div className={cn("flex gap-x-4", className)}>
        <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-3xl bg-border opacity-40 animate-pulse"></div>

        <div className="flex flex-col mt-2">
          <div className="w-28 h-6 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse"></div>
          <div className="w-56 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse mt-2"></div>
          <div className="w-16 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse mt-1"></div>
        </div>
      </div>
    );
  }

  const userName = getUserName(user || {});

  const toggleFollow = () => {
    const toggleFollow = user.isFollowedByUser ? unfollow : follow;
    toggleFollow({ id: user.id });
  };

  return (
    <>
      <div className={cn("flex gap-x-4", className)}>
        <div className="size-20 shrink-0 flex items-center justify-center rounded-3xl bg-primary cursor-pointer">
          {user.profileImage ? (
            <Image
              width={48}
              height={48}
              alt={userName}
              src={user.profileImage}
              className="w-full h-full object-cover rounded-3xl"
            />
          ) : (
            <div className="size-12 flex justify-center items-center overflow-hidden text-4xl text-light-gray-100 font-bold">
              {userName[0]}
            </div>
          )}
        </div>

        <div className="flex flex-col mt-2">
          <h1 className="text-2xl font-bold">{userName}</h1>
          <span className="block text-sm text-soft-foreground mt-1">{user.bio}</span>
        </div>
      </div>

      <div className="w-full flex gap-x-4 mt-6">
        <div className="flex-1 flex gap-y-1 flex-col items-center">
          <span className="text-lg">{user.publicStoriesCount}</span>
          <span className="text-sm">داستانک‌ها</span>
        </div>

        <div className="flex-1 flex gap-y-1 flex-col items-center">
          <span className="text-lg" onClick={() => setIsFollowersSheetOpen(true)}>
            {user.followersCount}
          </span>
          <span className="text-sm">دنبال کنندگان</span>
        </div>

        <div className="flex-1 flex gap-y-1 flex-col items-center">
          <span className="text-lg" onClick={() => setIsFollowingsSheetOpen(true)}>
            {user.followingsCount}
          </span>
          <span className="text-sm">دنبال شدگان</span>
        </div>
      </div>

      <div className="flex gap-x-2 mt-6 mx-5">
        <Button
          className="flex-1"
          disabled={isFollowPending || isUnfollowPending}
          variant={user.isFollowedByUser ? "outline" : "default"}
          onClick={toggleFollow}
        >
          <UserPlusIcon />
          <span className="mt-1">{user.isFollowedByUser ? "دنبال کرده‌اید" : "دنبال کردن"}</span>
        </Button>

        <Link href={`/messages/${user.id}`} className="basis-14">
          <Button variant="secondary" className="w-full">
            <SendIcon />
          </Button>
        </Link>
      </div>

      <UserFollowingsListSheet
        userId={user.id}
        isOpen={isFollowingsSheetOpen}
        onOpenChange={setIsFollowingsSheetOpen}
      />

      <UserFollowersListSheet
        userId={user.id}
        isOpen={isFollowersSheetOpen}
        onOpenChange={setIsFollowersSheetOpen}
      />
    </>
  );
}
