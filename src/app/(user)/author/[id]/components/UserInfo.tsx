"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import { SendIcon, UserPlusIcon } from "lucide-react";
import { useFollow, useGetUserById, useUnfollow } from "@/services/user";
import UserFollowersListSheet from "@/app/(user)/components/UserFollowersListSheet";
import UserFollowingsListSheet from "@/app/(user)/components/UserFollowingsListSheet";

type UserInfoProps = {
  id: number;
};

export default function UserInfo({ id }: UserInfoProps) {
  const [isFollowersSheetOpen, setIsFollowersSheetOpen] = useState(false);
  const [isFollowingsSheetOpen, setIsFollowingsSheetOpen] = useState(false);

  const { data: user } = useGetUserById({ id });
  const { mutate: follow, isPending: isFollowPending } = useFollow();
  const { mutate: unfollow, isPending: isUnfollowPending } = useUnfollow();

  if (!user) {
    return (
      <>
        <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-3xl bg-border opacity-40 animate-pulse"></div>
        <div className="w-28 h-6 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse mt-6"></div>
      </>
    );
  }

  const userName = getUserName(user || {});

  const toggleFollow = () => {
    const toggleFollow = user.isFollowedByUser ? unfollow : follow;
    toggleFollow({ id: user.id });
  };

  return (
    <>
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
      {user.isPremium && (
        <span className="text-sm text-primary bg-foreground py-2 px-4 rounded-lg -mt-3">
          کاربر حرفه‌ای
        </span>
      )}

      <h1 className="text-2xl font-bold mt-4">{userName}</h1>
      <span className="block text-sm text-soft-foreground mt-2">{user.bio}</span>

      <div className="w-full flex gap-x-4 mt-4">
        <div className="flex-1 flex gap-y-1 flex-col items-center">
          <span className="text-2xl" onClick={() => setIsFollowersSheetOpen(true)}>
            {user.followersCount}
          </span>
          <span>دنبال کنندگان</span>
        </div>

        <div className="flex-1 flex gap-y-1 flex-col items-center">
          <span className="text-2xl" onClick={() => setIsFollowingsSheetOpen(true)}>
            {user.followingsCount}
          </span>
          <span>دنبال شدگان</span>
        </div>
      </div>

      <div className="w-full flex gap-x-2 px-5 mt-6">
        <Button
          className="flex-1"
          disabled={isFollowPending || isUnfollowPending}
          variant={user.isFollowedByUser ? "outline" : "default"}
          onClick={toggleFollow}
        >
          <UserPlusIcon />
          <span className="mt-1">{user.isFollowedByUser ? "دنبال کرده‌اید" : "دنبال کردن"}</span>
        </Button>

        <Link href={`/messages/${user.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            <SendIcon />
            <span className="mt-1">پیام دادن</span>
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
