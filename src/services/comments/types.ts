import { User } from "@/services/user";

export type Comment = {
  id: number;
  user: User;
  text: string;
  createdAt: string;
  likesCount: number;
  isLikedByUser: boolean;
  isEditableByUser: boolean;
  isDeletableByUser: boolean;
};

export type EditCommentBody = {
  id: number;
  text: string;
};

export type DeleteCommentParams = {
  id: number;
};

export type LikeCommentParams = {
  id: number;
};

export type DislikeCommentParams = {
  id: number;
};

export type GetCommentLikersParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetCommentLikersResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  users: User[];
};
