import GTMProvider from "./GTMProvider";
import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";
import LoadingProvider from "./LoadingProvider";
import { ToastContainer } from "react-toastify";
import { PropsWithChildren, Suspense } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<span>در حال بارگذاری ...</span>}>
      <LoadingProvider>
        <QueryProvider>
          <AuthProvider>
            <GTMProvider>{children}</GTMProvider>
          </AuthProvider>

          <ToastContainer rtl draggable limit={2} draggablePercent={10} />
        </QueryProvider>
      </LoadingProvider>
    </Suspense>
  );
}
