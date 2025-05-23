import BackArrow from "@/components/BackArrow";
import InfiniteNotificationList from "./components/InfiniteNotificationList";

export default function NotificationsPage() {
  return (
    <section className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">اعلان‌ها</h1>
      </header>

      <div className="px-5 mt-4">
        <span className="block text-sm text-soft-foreground mt-1">
          اعلان‌های جدید و مهم در اینجا نمایش داده می‌شوند.
        </span>
      </div>

      <InfiniteNotificationList className="mx-5 mt-12" />
    </section>
  );
}
