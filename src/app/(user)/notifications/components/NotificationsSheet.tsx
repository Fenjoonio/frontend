"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { useGetUserNotifications, useMarkNotificationAsRead } from "@/services/notifications";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type NotificationsSheetProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function NotificationsSheet({ isOpen, onOpenChange }: NotificationsSheetProps) {
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { data } = useGetUserNotifications({ refetchInterval: 5000 });

  useEffect(() => {
    if (isOpen) {
      const notificationsIds = data?.notifications?.map((notification) => notification.id) || [];
      if (notificationsIds.length) {
        markAsRead({ ids: notificationsIds });
      }
    }
  }, [data?.notifications, isOpen, markAsRead]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetHeader className="sr-only">
        <SheetTitle>اعلان‌ها</SheetTitle>
        <SheetDescription>لیست اعلانات شما</SheetDescription>
      </SheetHeader>

      <SheetContent className="min-h-40">
        <section className="divide-y divide-[#505050] ">
          {data?.notifications?.map((notification) => (
            <Link
              key={notification.id}
              href={notification.url}
              className="flex items-center justify-between py-4"
            >
              <div className="flex flex-col text-sm">
                <div className="w-fit relative">
                  <span className="font-bold">{notification.title}</span>
                  {!notification.isRead && (
                    <span className="size-1 absolute top-0 -left-2 bg-[#C46B5A] rounded-sm duration-1000 animate-pulse"></span>
                  )}
                </div>

                <span className="text-[#B0B0B0]">{notification.message}</span>
              </div>

              <ArrowLeftIcon className="size-5" />
            </Link>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  );
}
