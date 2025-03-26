import type { Story } from "@/services/stories";
import type { Comment } from "@/services/comments";

export type User = {
  id: number;
  phone: string;
  firstName: string;
  lastName: string;
  nickname: string;
  bio: string;
  isVerified: boolean;
};

export type GetUserByIdParams = {
  id: number;
};

export type GetUserStoriesByIdParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetUserStoriesByIdResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  stories: Story[];
};

export type GetUserCommentsByIdParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetUserCommentsByIdResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  comments: Comment[];
};
