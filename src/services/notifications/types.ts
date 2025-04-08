export type Notification = {
  id: number;
  title: string;
  message: string;
  url: string;
  image: string;
  isRead: boolean;
  createdAt: string;
};

export type GetUserNotificationsParams = {
  page?: number;
  limit?: number;
};

export type GetUserNotificationsResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  notifications: Notification[];
};

export type MarkNotificationAsReadBody = {
  ids: number[];
};
