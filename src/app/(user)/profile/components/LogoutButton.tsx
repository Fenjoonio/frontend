"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon, LogOutIcon } from "lucide-react";
import { useAuthContext } from "@/providers/AuthProvider";
import { deleteUserCredentials } from "@/app/(user)/accounts/actions";

export default function LogoutButton() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthContext();

  const logout = async () => {
    await deleteUserCredentials();
    setIsLoggedIn(false);

    setTimeout(() => {
      router.push("/");
    }, 0);
  };

  return (
    <button className="w-full flex gap-x-2 items-center py-3 px-2" onClick={logout}>
      <div className="bg-background rounded-[8px] p-2">
        <LogOutIcon className="w-5 h-5 " />
      </div>

      <span className="text-sm  mt-[2px]">خروج</span>

      <ArrowLeftIcon className="w-5 h-5 ms-auto me-1" />
    </button>
  );
}
