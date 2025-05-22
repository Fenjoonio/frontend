import dayjs from "dayjs";
import { useEffect } from "react";
import { cn } from "@/lib/utils/classnames";
import { type User } from "@/services/user";
import { type Message } from "@/services/messages";
import { CheckIcon, CheckCheckIcon } from "lucide-react";
import { useReadMessage } from "@/services/messages/hooks";

const formatCreateAtDate = (createAt: string) => {
  return dayjs(createAt).format("H:m");
};

type MessageProps = {
  user: User;
  message: Message;
  className?: string;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
};

export default function Message({
  user,
  message,
  isFirstInGroup = true,
  isLastInGroup = true,
  className,
}: MessageProps) {
  const { mutate: readMessage } = useReadMessage();
  const Icon = !!message.readAt ? CheckCheckIcon : CheckIcon;
  const isMyMessage = message.fromId !== user.id || message.toId === user.id;

  useEffect(() => {
    if (!isMyMessage && !message.readAt) {
      readMessage({ id: message.id });
    }
  }, [message.id, message.readAt, isMyMessage, readMessage]);

  return (
    <div className={cn("flex flex-col", isMyMessage ? "self-start" : "self-end", className)}>
      <div
        key={message.id}
        className={cn(
          "whitespace-pre-line py-2 px-4",
          isMyMessage ? "bg-primary" : "bg-soft-background",
          // Single messages
          isMyMessage && isFirstInGroup && isLastInGroup && "rounded-lg rounded-br-none",
          !isMyMessage && isFirstInGroup && isLastInGroup && "rounded-lg rounded-bl-none",
          // Two messages or more
          isMyMessage &&
            isFirstInGroup &&
            !isLastInGroup &&
            "rounded-lg rounded-tr-xl rounded-br-sm",
          isMyMessage && !isFirstInGroup && !isLastInGroup && "rounded-lg rounded-br-md",
          isMyMessage && !isFirstInGroup && isLastInGroup && "rounded-lg rounded-br-none",
          !isMyMessage &&
            isFirstInGroup &&
            !isLastInGroup &&
            "rounded-lg rounded-tl-xl rounded-bl-sm",
          !isMyMessage && !isFirstInGroup && !isLastInGroup && "rounded-lg rounded-bl-md",
          !isMyMessage && !isFirstInGroup && isLastInGroup && "rounded-lg rounded-bl-none",
          // Add spacing between message groups
          isFirstInGroup && "mt-4",
          !isFirstInGroup && "mt-0.5"
        )}
      >
        {message.message}
      </div>

      {isLastInGroup && (
        <div
          className={cn(
            "flex gap-x-2 items-center mt-2",
            isMyMessage ? "justify-start" : "justify-end"
          )}
        >
          {isMyMessage && <Icon className="size-3 text-soft-foreground" />}
          <span className="text-xs text-soft-foreground">
            {formatCreateAtDate(message.createdAt)}
          </span>
        </div>
      )}
    </div>
  );
}
