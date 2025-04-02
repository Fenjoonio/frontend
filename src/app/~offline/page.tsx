import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اینترنت نیست",
};

export default function OfflinePage() {
  return (
    <section>
      <div className="h-[calc(100svh-57px)] flex flex-col items-center justify-center px-4">
        <h1 className="text-lg font-bold mt-4">اینترنت نیست!</h1>
        <span className="text-soft-foreground text-center mt-2">
          لطفا اتصال اینترنت خودتون رو بررسی کنید و صفحه رو از بالا به پایین بکشید
        </span>
      </div>
    </section>
  );
}
