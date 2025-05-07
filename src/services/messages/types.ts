export type Message = {
  id: number;
  fromId: number;
  message: string;
  createdAt: string;
  isRead: boolean;
  isUpdated: boolean;
};

export type SendMessageBody = {
  to: number;
  message: string;
};

export type GetChatMessagesParams = {
  userId: number;
  limit?: number;
  cursor?: string;
};

export type GetChatMessagesResponse = {
  pagination: {
    limit: number;
    total: number;
    cursor: string;
  };
  messages: Message[];
};

export type UpdateMessageBody = {
  id: number;
  content: string;
};

export type DeleteMessageParams = {
  id: number;
};

export type ReadMessageParams = {
  id: number;
};
