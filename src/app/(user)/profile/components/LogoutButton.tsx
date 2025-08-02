"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "@/services/accounts";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon, LogOutIcon } from "lucide-react";
import { useAuthContext } from "@/providers/AuthProvider";
import { getUserCredentials } from "@/app/(user)/accounts/actions";

export default function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = useAuthContext();
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      router.push("/");
      queryClient.clear();
      setIsLoggedIn(false);
    },
  });

  const logoutAndRedirect = async () => {
    const { refreshToken } = await getUserCredentials();
    logout({ refreshToken });
  };

  return (
    <button
      className="w-full flex gap-x-2 items-center cursor-pointer py-3 px-2"
      onClick={logoutAndRedirect}
    >
      <div className="bg-background rounded-[8px] p-2">
        <LogOutIcon className="w-5 h-5 " />
      </div>

      <span className="text-sm  mt-[2px]">خروج</span>

      <ArrowLeftIcon className="w-5 h-5 ms-auto me-1" />
    </button>
  );
}
