"use client";

import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import Message from "./components/Message";
import { useParams } from "next/navigation";
import BackArrow from "@/components/BackArrow";
import { getUserName } from "@/lib/utils/users";
import { Button } from "@/components/ui/button";
import { useGetUserById } from "@/services/user";
import { SendHorizonalIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useEffect, useState, KeyboardEvent } from "react";
import { useGetInfiniteChatMessages, useSendMessage } from "@/services/messages";

const isWithinFiveMinutes = (time1: string, time2: string) => {
  const diff = dayjs(time1).diff(dayjs(time2), "minute");
  return Math.abs(diff) <= 5;
};

export default function MessagePage() {
  const params = useParams<{ id: string }>();
  const [messageText, setMessageText] = useState("");
  const { data: user } = useGetUserById({ id: +params.id });
  const [inputTranslateY, setInputTranslateY] = useState(0);

  const { data } = useGetInfiniteChatMessages(
    {
      userId: +params.id,
    },
    { refetchInterval: 1500 }
  );

  const { mutate: sendMessage, isPending: isSending } = useSendMessage({
    onSuccess: () => {
      setMessageText("");
    },
  });

  const messages = useMemo(
    () => data?.pages.flatMap((page) => page.messages ?? []).reverse() ?? [],
    [data?.pages]
  );

  useEffect(() => {
    const handleKeyboardHeightChange = (event: any) => {
      const { height } = event.detail;
      setInputTranslateY(height > 0 ? -height : 0);
    };

    window.addEventListener("keyboardHeightChange", handleKeyboardHeightChange);

    return () => {
      window.removeEventListener("keyboardHeightChange", handleKeyboardHeightChange);
    };
  }, []);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage({
        to: +params.id,
        message: messageText.trim(),
      });
    }
  };

  const onKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) return null;

  return (
    <section
      style={{ backgroundImage: "url('/assets/images/pattern.svg')", backgroundSize: "200px" }}
      className="h-svh flex flex-col relative"
    >
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">{getUserName(user)}</h1>
      </header>

      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div
          className="flex flex-col gap-y-1 py-4 px-2 transition-transform will-change-transform"
          style={{ transform: `translateY(${inputTranslateY}px)` }}
        >
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const nextMessage = messages[index + 1];
            const isFirstInGroup =
              !prevMessage ||
              prevMessage.fromId !== message.fromId ||
              !isWithinFiveMinutes(message.createdAt, prevMessage.createdAt);
            const isLastInGroup =
              !nextMessage ||
              nextMessage.fromId !== message.fromId ||
              !isWithinFiveMinutes(message.createdAt, nextMessage.createdAt);

            return (
              <Message
                key={message.id}
                user={user}
                message={message}
                isFirstInGroup={isFirstInGroup}
                isLastInGroup={isLastInGroup}
                data-message-id={message.id}
                className={cn({ "mt-4": isFirstInGroup }, { "mt-0.5": !isFirstInGroup })}
              />
            );
          })}
        </div>
      </div>

      <div
        className="flex gap-x-2 items-end bg-soft-background py-4 px-4 sticky bottom-0 z-10 transition-transform will-change-transform"
        style={{ transform: `translateY(${inputTranslateY}px)` }}
      >
        <Textarea
          inputMode="text"
          autoComplete="off"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="متن پیامت رو اینجا بنویس"
          className="max-h-32 min-h-14 caret-primary bg-background border-none resize-none"
          onKeyDown={onKeydown}
        />

        <Button className="size-14 shrink-0" onClick={handleSendMessage} disabled={isSending}>
          <SendHorizonalIcon className="rotate-180" />
        </Button>
      </div>
    </section>
  );
}