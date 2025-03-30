export type Notification = {
  id: number;
  title: string;
  text: string;
  url: string;
  image: string;
  created_at: string;
};

export type MarkNotificationAsReadBody = {
  ids: number[];
};
