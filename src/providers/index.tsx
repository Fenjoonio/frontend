import { cookies } from "next/headers";
import GTMProvider from "./GTMProvider";
import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";
import LoadingProvider from "./LoadingProvider";
import { ToastContainer } from "react-toastify";
import { isDev } from "@/lib/utils/environment";
import { PropsWithChildren, Suspense } from "react";
import { getUserCredentials } from "@/app/(user)/accounts/actions";

export default async function Providers({ children }: PropsWithChildren) {
  const { get } = await cookies();
  const { accessToken } = await getUserCredentials();

  return (
    <Suspense>
      <LoadingProvider initialValue={!isDev() && get("isWebView")?.value !== "true"}>
        <QueryProvider>
          <AuthProvider initialAccessToken={accessToken}>
            <GTMProvider>{children}</GTMProvider>
          </AuthProvider>

          <ToastContainer rtl draggable limit={2} draggablePercent={10} />
        </QueryProvider>
      </LoadingProvider>
    </Suspense>
  );
}
