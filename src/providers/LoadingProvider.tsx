"use client";

import Loading from "@/components/Loading";
import { type PropsWithChildren, useEffect, useState } from "react";

type LoadingProviderProps = PropsWithChildren<{
  initialValue?: boolean;
}>;

export default function LoadingProvider({ initialValue = false, children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(initialValue);

  useEffect(() => {
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
