import { headers } from "next/headers";
import { userAgent } from "next/server";
import AppProvider from "./AppProvider";
import GTMProvider from "./GTMProvider";
import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";
import LoadingProvider from "./LoadingProvider";
import { ToastContainer } from "react-toastify";
import { PropsWithChildren, Suspense } from "react";
import { getUserCredentials } from "@/app/(user)/accounts/actions";

export default async function Providers({ children }: PropsWithChildren) {
  const { accessToken } = await getUserCredentials();
  const { ua } = userAgent({ headers: await headers() });

  return (
    <Suspense>
      <LoadingProvider initialValue={ua !== "Fenjoon-WebView"}>
        <QueryProvider>
          <AuthProvider initialAccessToken={accessToken}>
            <GTMProvider>
              <AppProvider>{children}</AppProvider>
            </GTMProvider>
          </AuthProvider>

          <ToastContainer rtl draggable limit={2} draggablePercent={10} />
        </QueryProvider>
      </LoadingProvider>
    </Suspense>
  );
}
