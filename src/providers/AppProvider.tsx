"use client";

import { isApp } from "@/lib/utils/environment";
import { registerPushToken } from "@/services/push";
import { PropsWithChildren, useEffect } from "react";

export default function AppProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (!isApp()) return;

    // This Function will call on the app
    (window as any).setUserPushToken = async (token: string) => {
      await registerPushToken({ token });
      alert(token);
    };
  }, []);

  return children;
}
