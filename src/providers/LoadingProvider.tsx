"use client";

import Loading from "@/components/Loading";
import { isDev, isApp } from "@/lib/utils/environment";
import { type PropsWithChildren, useLayoutEffect, useState } from "react";

export default function LoadingProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(!isDev() && !isApp());

  useLayoutEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {children}
      {isLoading && <Loading />}
    </>
  );
}
