"use client";

import Message from "./components/Message";
import { useParams } from "next/navigation";
import BackArrow from "@/components/BackArrow";
import { getUserName } from "@/lib/utils/users";
import { Button } from "@/components/ui/button";
import { useGetUserById } from "@/services/user";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonalIcon, Loader2 } from "lucide-react";
import { useMemo, useRef, useEffect, useState, KeyboardEvent } from "react";
import { useGetInfiniteChatMessages, useSendMessage } from "@/services/messages";

export default function MessagePage() {
  const params = useParams<{ id: string }>();
  const { data: user } = useGetUserById({ id: +params.id });

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetInfiniteChatMessages(
    {
      userId: +params.id,
    },
    { refetchInterval: 2500 }
  );

  const { mutate: sendMessage, isPending: isSending } = useSendMessage({
    onSuccess: () => {
      setMessageText("");
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    },
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isFirstRender = useRef(true);
  const [messageText, setMessageText] = useState("");
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const messages = useMemo(
    () => data?.pages.flatMap((page) => page.messages ?? []).reverse() ?? [],
    [data?.pages]
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isFirstRender.current && messages.length > 0 && messagesContainerRef.current) {
      scrollToBottom();
      isFirstRender.current = false;
    }
  }, [messages]);

  useEffect(() => {
    if (!isFirstRender.current && autoScrollEnabled && messagesContainerRef.current) {
      scrollToBottom();
    }
  }, [messages, autoScrollEnabled]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setAutoScrollEnabled(true);
      sendMessage({
        to: +params.id,
        message: messageText.trim(),
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.target as HTMLDivElement;

    if (container.scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
      const spacerHeight = spacerRef.current?.offsetHeight || 0;
      const scrollPosition = container.scrollTop;

      fetchNextPage().then(() => {
        setTimeout(() => {
          if (messagesContainerRef.current && spacerRef.current) {
            const newSpacerHeight = spacerRef.current.offsetHeight || 0;
            const heightDiff = newSpacerHeight - spacerHeight;
            messagesContainerRef.current.scrollTop = scrollPosition + heightDiff;
          }
        }, 10);
      });
    }

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    setAutoScrollEnabled(isNearBottom);
  };

  const onKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">{getUserName(user)}</h1>
      </header>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto flex flex-col-reverse"
        onScroll={handleScroll}
      >
        <div ref={messagesEndRef} />

        <div className="flex flex-col gap-y-1 py-4 px-2">
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const nextMessage = messages[index + 1];
            const isFirstInGroup = !prevMessage || prevMessage.fromId !== message.fromId;
            const isLastInGroup = !nextMessage || nextMessage.fromId !== message.fromId;

            return (
              <Message
                key={message.id}
                user={user}
                message={message}
                isFirstInGroup={isFirstInGroup}
                isLastInGroup={isLastInGroup}
                data-message-id={message.id}
              />
            );
          })}

          <div ref={spacerRef} className="flex-grow" />
        </div>
      </div>

      <div className="flex gap-x-2 items-end bg-soft-background py-4 px-4 sticky bottom-0">
        <Textarea
          ref={textareaRef}
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
