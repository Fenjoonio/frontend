import { MESSAGES_QUERY_KEYS } from "./constants";
import type { Message, GetChatMessagesParams, UpdateMessageBody } from "./types";
import { useMutation, useQueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  sendMessage,
  getChatMessages,
  updateMessage,
  deleteMessage,
  readMessage,
  getUserUnreadMessagesCount,
} from "./functions";

export function useGetInfiniteChatMessages(
  params: GetChatMessagesParams,
  options?: { refetchInterval?: number }
) {
  return useInfiniteQuery({
    ...options,
    initialPageParam: params,
    queryKey: [MESSAGES_QUERY_KEYS.GET_CHAT_MESSAGES, params],
    queryFn: ({ pageParam }) => getChatMessages(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.cursor
        ? {
            userId: params.userId,
            limit: lastPage.pagination.limit,
            cursor: lastPage.pagination.cursor,
          }
        : undefined;
    },
  });
}

export function useSendMessage(options?: { onSuccess?: (res: Message) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEYS.GET_CHAT_MESSAGES] });
    },
  });
}

export function useUpdateMessage(
  params: Pick<UpdateMessageBody, "id">,
  options?: { onSuccess?: (res: Message) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMessage,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEYS.GET_CHAT_MESSAGES] });
    },
  });
}

export function useDeleteMessage(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      options?.onSuccess?.();
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEYS.GET_CHAT_MESSAGES] });
    },
  });
}

export function useReadMessage(options?: { onSuccess?: (res: Message) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readMessage,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEYS.GET_CHAT_MESSAGES] });
    },
  });
}

export function useGetUserUnreadMessagesCount(options?: {
  enabled?: boolean;
  refetchInterval?: number;
}) {
  return useQuery({
    ...options,
    queryKey: [MESSAGES_QUERY_KEYS.GET_USER_UNREAD_MESSAGES_COUNT],
    queryFn: getUserUnreadMessagesCount,
  });
}
