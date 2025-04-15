import BackArrow from "@/components/BackArrow";
import InfiniteNotificationList from "./components/InfiniteNotificationList";

export default function NotificationsPage() {
  return (
    <section className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="flex items-end justify-between bg-background sticky top-0 border-b border-border z-10 pb-3 px-2"
      >
        <BackArrow />
      </header>

      <div className="px-5 mt-4">
        <h1 className="text-lg font-bold">اعلان‌ها</h1>
        <span className="block text-sm text-soft-foreground mt-1">
          اعلان‌های جدید و مهم در اینجا نمایش داده می‌شوند.
        </span>
      </div>

      <InfiniteNotificationList className="mx-5 mt-12" />
    </section>
  );
}
