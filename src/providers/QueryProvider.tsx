"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 3, retryDelay: 1500 } },
});

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
