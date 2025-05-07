"use client";

import BackArrow from "@/components/BackArrow";
import { Button } from "@/components/ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useGetUserById } from "@/services/user";
import { getUserName } from "@/lib/utils/users";
import { useMemo } from "react";
import { useGetInfiniteChatMessages } from "@/services/messages";

export default function MessagePage() {
  const params = useParams<{ id: string }>();
  const { data: user } = useGetUserById({ id: +params.id });
  const { data, isFetching, hasNextPage, fetchNextPage, refetch } = useGetInfiniteChatMessages({
    userId: +params.id,
  });

  const messages = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.messages ?? []) : [];
  }, [data?.pages]);

  if (!user) return;

  return (
    <section className="flex flex-col min-h-svh relative">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">{getUserName(user)}</h1>
      </header>

      <div className="flex-1 flex gap-y-2 flex-col-reverse items-start py-4 px-2">
        {messages.map((message) => (
          <div key={message.id} className="bg-primary rounded-lg rounded-br-none py-2 px-4">
            {message.message}
          </div>
        ))}
      </div>

      <div className="w-full flex gap-x-2 items-end bg-soft-background py-4 px-4">
        <Textarea
          placeholder="متن پیامت رو اینجا بنویس"
          className="max-h-32 min-h-14 bg-background border-none resize-none"
        />
        <Button className="size-14 shrink-0">
          <SendHorizonalIcon className="rotate-180" />
        </Button>
      </div>
    </section>
  );
}
