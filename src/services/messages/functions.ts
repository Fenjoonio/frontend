import http from "@/lib/utils/http";
import type {
  SendMessageBody,
  GetChatMessagesParams,
  GetChatMessagesResponse,
  UpdateMessageBody,
  DeleteMessageParams,
  ReadMessageParams,
  Message,
} from "./types";

export async function sendMessage(body: SendMessageBody) {
  const response = await http.post<Message>("v1/messages", body);

  return response.data;
}

export async function getChatMessages({ userId, ...params }: GetChatMessagesParams) {
  const response = await http.get<GetChatMessagesResponse>(`v1/messages/chat/${userId}`, {
    searchParams: params,
  });

  return response.data;
}

export async function updateMessage({ id, ...body }: UpdateMessageBody) {
  const response = await http.put<Message>(`v1/messages/${id}`, body);

  return response.data;
}

export async function deleteMessage({ id }: DeleteMessageParams) {
  const response = await http.delete<void>(`v1/messages/${id}`);

  return response.data;
}

export async function readMessage({ id }: ReadMessageParams) {
  const response = await http.patch<Message>(`v1/messages/${id}/read`);

  return response.data;
}
