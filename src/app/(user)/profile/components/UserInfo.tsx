"use client";

import { getUserName } from "@/lib/utils/users";
import { useGetCurrentUser, useUploadUserProfile } from "@/services/user";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function UserInfo() {
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: uploadProfile } = useUploadUserProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!currentUser) {
    return (
      <>
        <div className="w-20 h-20 shrink-0 flex items-center justify-center rounded-3xl bg-border opacity-40 animate-pulse"></div>
        <div className="bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse mt-6"></div>
      </>
    );
  }

  const userName = getUserName(currentUser || {});

  const uploadUserProfile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      toast.error("هیچ تصویری انتخاب نشده است");
      return;
    }

    uploadProfile({ image: file });
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div
        className="size-20 shrink-0 flex items-center justify-center rounded-3xl bg-primary cursor-pointer"
        onClick={uploadUserProfile}
      >
        {currentUser.profileImage ? (
          <Image
            width={48}
            height={48}
            alt={userName}
            src={currentUser.profileImage}
            className="w-full h-full object-cover rounded-3xl"
          />
        ) : (
          <div className="size-12 flex justify-center items-center overflow-hidden text-4xl text-light-gray-100 font-bold">
            {userName[0]}
          </div>
        )}
      </div>
      {currentUser.isPremium && (
        <span className="text-sm text-primary bg-foreground py-2 px-4 rounded-lg -mt-3">
          کاربر حرفه‌ای
        </span>
      )}

      <h1 className="text-2xl mt-4">{userName}</h1>
    </>
  );
}
