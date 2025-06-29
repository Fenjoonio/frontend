import type { User } from "@/services/user";
import { Comment } from "@/services/comments/types";

export type Story = {
  id: number;
  user: User;
  text: string;
  createdAt: string;
  likesCount: number;
  isPrivate: boolean;
  sharesCount: number;
  commentsCount: number;
  isLikedByUser: boolean;
  isEditableByUser: boolean;
  isDeletableByUser: boolean;
  isPrivatableByUser: boolean;
  isBookmarkedByUser: boolean;
};

export type GetStoriesParams = {
  page: number;
  limit: number;
};

export type GetStoriesResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  stories: Story[];
};

export type AddNewStoryBody = {
  text: string;
};

export type AddNewStoryResponse = {
  text: string;
};

export type EditStoryBody = {
  id: number;
  text: string;
};

export type GetSingleStoryParams = {
  id: number;
};

export type DeleteStoryParams = {
  id: number;
};

export type DeleteStoryResponse = {
  id: string;
};

export type GetStoryCommentsParams = {
  id: string;
  page?: number;
  limit?: number;
};

export type GetStoryCommentsResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  comments: Comment[];
};

export type AddStoryCommentBody = {
  id: string;
  text: string;
};

export type LikeStoryParams = {
  id: number;
};

export type DislikeStoryParams = {
  id: number;
};

export type GetStoryLikersParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetStoryLikersResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  users: User[];
};

export type ShareStoryParams = {
  id: number;
};

export type ReportStoryBody = {
  id: number;
  reason: string;
};

export type ChangeStoryVisibilityBody = {
  id: number;
  isPrivate: boolean;
};

export type StoryBookmark = {
  id: number;
};

export type DeleteStoryBookmark = {
  id: number;
};

export type WriteStoryWithAiBody = {
  text: string;
};

export type GetAuthorOtherStoriesParams = {
  id: number;
};

export type GetAuthorOtherStoriesResponse = Story[];
