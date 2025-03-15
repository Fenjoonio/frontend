"use client";

import { getUserName } from "@/lib/utils/users";
import { useGetCurrentUser } from "@/services/user";

export default function UserInfo() {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser) {
    return (
      <>
        <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-3xl bg-[#505050] opacity-40 animate-pulse"></div>
        <div className="w-28 h-6 bg-[#505050] opacity-40 rounded-full animate-pulse mt-6"></div>
      </>
    );
  }

  const userName = getUserName(currentUser || {});

  return (
    <>
      <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-3xl bg-[#9C6B4A]">
        <div className="w-12 h-12 flex justify-center items-center overflow-hidden text-4xl font-bold">
          {userName[0]}
        </div>
      </div>

      <h1 className="text-2xl mt-4">{userName}</h1>
    </>
  );
}
