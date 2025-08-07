"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import { useGetCurrentUser } from "@/services/user";
import { PenIcon, SettingsIcon } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import CreateNewStoryDialog from "@/app/(story)/components/CreateNewStoryDialog";
import UserFollowersListSheet from "@/app/(user)/components/UserFollowersListSheet";
import UserFollowingsListSheet from "@/app/(user)/components/UserFollowingsListSheet";

type UserInfoProps = {
  className?: string;
};

export default function UserInfo({ className }: UserInfoProps) {
  const { data: user } = useGetCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowersSheetOpen, setIsFollowersSheetOpen] = useState(false);
  const [isFollowingsSheetOpen, setIsFollowingsSheetOpen] = useState(false);

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

  const openAddStoryModalIfLoggedIn = () => {
    setIsModalOpen(true);
    sendGAEvent("event", "add_new_story", { location: "profile" });
  };

  return (
    <>
      <div className={cn("flex gap-x-4", className)}>
        <div className="size-20 shrink-0 flex items-center justify-center rounded-3xl bg-primary cursor-pointer">
          {user.profileImage ? (
            <Image
              priority
              width={80}
              height={80}
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
        <Link href="/profile/edit" className="flex-1">
          <Button variant="secondary" className="w-full">
            <span className="mt-1">ویرایش اطلاعات کاربری</span>
          </Button>
        </Link>

        <Link href="/profile" className="basis-14">
          <Button variant="secondary" className="w-full">
            <SettingsIcon />
          </Button>
        </Link>

        <Button className="basis-14" onClick={openAddStoryModalIfLoggedIn}>
          <PenIcon />
        </Button>
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

      <CreateNewStoryDialog open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
