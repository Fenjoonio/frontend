"use client";

import dayjs from "dayjs";
import Message from "./components/Message";
import { useParams } from "next/navigation";
import BackArrow from "@/components/BackArrow";
import { getUserName } from "@/lib/utils/users";
import { Button } from "@/components/ui/button";
import { useGetUserById } from "@/services/user";
import { SendHorizonalIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useRef, useEffect, useState, KeyboardEvent } from "react";
import { useGetInfiniteChatMessages, useSendMessage } from "@/services/messages";

const isWithinFiveMinutes = (time1: string, time2: string) => {
  const diff = dayjs(time1).diff(dayjs(time2), "minute");
  return Math.abs(diff) <= 5;
};

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [messageText, setMessageText] = useState("");
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [inputBottom, setInputBottom] = useState(0); // Dynamic bottom position for input

  const previousScrollHeightRef = useRef<number>(0);
  const previousScrollTopRef = useRef<number>(0);
  const isLoadingMoreRef = useRef<boolean>(false);

  const messages = useMemo(
    () => data?.pages.flatMap((page) => page.messages ?? []).reverse() ?? [],
    [data?.pages]
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Adjust input position above keyboard
  const adjustInputPosition = () => {
    const viewportHeight = window.innerHeight;
    const keyboardHeight = window.visualViewport ? window.visualViewport.height : viewportHeight;
    const safeAreaBottom =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-bottom")
      ) || 0;
    setInputBottom(viewportHeight - keyboardHeight + safeAreaBottom);
  };

  // Handle input focus (keyboard appears)
  const handleFocus = () => {
    adjustInputPosition();
    scrollToBottom(); // Ensure chat stays scrolled to bottom
  };

  // Handle input blur (keyboard hides)
  const handleBlur = () => {
    setTimeout(() => {
      setInputBottom(0); // Reset to default when keyboard hides
    }, 100); // Delay to allow button clicks
  };

  useEffect(() => {
    if (isFirstRender.current && messages.length > 0 && messagesContainerRef.current) {
      scrollToBottom();
      isFirstRender.current = false;
    }
  }, [messages]);

  useEffect(() => {
    if (
      !isFirstRender.current &&
      !isLoadingMoreRef.current &&
      autoScrollEnabled &&
      messagesContainerRef.current
    ) {
      scrollToBottom();
    }

    if (isLoadingMoreRef.current && !isFetchingNextPage) {
      isLoadingMoreRef.current = false;
    }
  }, [messages, autoScrollEnabled, isFetchingNextPage]);

  useEffect(() => {
    if (
      !isFetchingNextPage &&
      previousScrollHeightRef.current > 0 &&
      messagesContainerRef.current
    ) {
      const newScrollHeight = messagesContainerRef.current.scrollHeight;
      const heightDifference = newScrollHeight - previousScrollHeightRef.current;

      if (heightDifference > 0) {
        messagesContainerRef.current.scrollTop = previousScrollTopRef.current + heightDifference;
      }

      previousScrollHeightRef.current = 0;
      previousScrollTopRef.current = 0;
    }
  }, [isFetchingNextPage, messages]);

  // Set up keyboard detection
  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current === document.activeElement) {
        adjustInputPosition();
      }
    };

    window.addEventListener("resize", handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

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
      previousScrollHeightRef.current = container.scrollHeight;
      previousScrollTopRef.current = container.scrollTop;
      isLoadingMoreRef.current = true;

      fetchNextPage();
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
              />
            );
          })}
        </div>
      </div>

      <div
        ref={inputContainerRef}
        className="flex gap-x-2 items-end bg-soft-background sticky z-10 py-4 px-4"
        style={{ bottom: `${inputBottom}px` }}
      >
        <Textarea
          ref={textareaRef}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="متن پیامت رو اینجا بنویس"
          className="max-h-32 min-h-14 caret-primary bg-background border-none resize-none"
          onKeyDown={onKeydown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <Button className="size-14 shrink-0" onClick={handleSendMessage} disabled={isSending}>
          <SendHorizonalIcon className="rotate-180" />
        </Button>
      </div>
    </section>
  );
}
