"use client";

import { isApp } from "@/lib/utils/environment";
import { registerPushToken } from "@/services/push";
import { PropsWithChildren, useEffect, useRef } from "react";

export default function AppProvider({ children }: PropsWithChildren) {
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!isApp()) return;

    const getPushToken = () => {
      const pushToken = window.expoPushToken;

      alert("I'm called " + pushToken);
      if (pushToken) {
        registerPushToken({ token: pushToken }).catch((err) => {
          alert("I'm error " + JSON.stringify(err));
        });
        clearTimeout(timer.current);

        return;
      }

      timer.current = setTimeout(getPushToken, 3000);
    };

    getPushToken();
  }, []);

  return children;
}
