"use client";

import { getUserName } from "@/lib/utils/users";
import { useGetCurrentUser } from "@/services/user";

export default function UserInfo() {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser) {
    return (
      <>
        <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-3xl bg-border opacity-40 animate-pulse"></div>
        <div className="bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse mt-6"></div>
      </>
    );
  }

  const userName = getUserName(currentUser || {});

  return (
    <>
      <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-3xl bg-primary">
        <div className="w-12 h-12 flex justify-center items-center overflow-hidden text-4xl text-light-gray-100 font-bold">
          {userName[0]}
        </div>
      </div>

      <h1 className="text-2xl mt-4">{userName}</h1>
    </>
  );
}
