"use client";

import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import { useGetUserById } from "@/services/user";
import { Share2Icon, UserPlusIcon } from "lucide-react";

type UserInfoProps = {
  id: number;
};

export default function UserInfo({ id }: UserInfoProps) {
  const { data: user } = useGetUserById({ id });

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
    toast.info("این قابلیت بزودی اضافه می‌شود.");
  };

  const share = () => {
    toast.info("این قابلیت بزودی اضافه می‌شود.");
  };

  return (
    <>
      <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-3xl bg-primary">
        <div className="w-12 h-12 flex justify-center items-center overflow-hidden text-4xl text-light-gray-100 font-bold">
          {userName[0]}
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-4">{userName}</h1>
      <span className="block text-sm text-soft-foreground mt-2">{user.bio}</span>

      <div className="w-full flex gap-x-2 px-5 mt-6">
        <Button className="flex-1" onClick={toggleFollow}>
          <UserPlusIcon />
          <span className="mt-1">دنبال کردن</span>
        </Button>

        <Button variant="outline" className="flex-1" onClick={share}>
          <Share2Icon />
          <span className="mt-1">اشتراک‌گذاری</span>
        </Button>
      </div>
    </>
  );
}
