"use client";

import { isApp } from "@/lib/utils/environment";
import { useAuthContext } from "./AuthProvider";
import { registerPushToken } from "@/services/push";
import { PropsWithChildren, useEffect, useRef } from "react";

export default function AppProvider({ children }: PropsWithChildren) {
  const retryCounter = useRef(3);
  const { isLoggedIn } = useAuthContext();
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!isApp()) return;

    const getPushToken = () => {
      if (retryCounter.current < 1) {
        clearTimeout(timer.current);
        return;
      }

      const pushToken = window.expoPushToken;

      if (pushToken) {
        registerPushToken({ token: pushToken }).catch(() => {});
        clearTimeout(timer.current);

        return;
      }

      retryCounter.current = retryCounter.current - 1;
      timer.current = setTimeout(getPushToken, 5000);
    };

    getPushToken();

    return () => {
      clearTimeout(timer.current);
    };
  }, [isLoggedIn]);

  return children;
}
