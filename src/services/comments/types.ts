import { User } from "@/services/user";

export type Comment = {
  id: number;
  user: User;
  text: string;
  createdAt: string;
};

export type EditCommentBody = {
  id: number;
  text: string;
};
