import type { Novel } from "@/services/novels";
import type { Chat } from "@/services/messages";
import type { Story } from "@/services/stories";
import type { Comment } from "@/services/comments";

export type User = {
  id: number;
  phone: string;
  firstName: string;
  lastName: string;
  nickname: string;
  bio: string;
  isBot: boolean;
  isPremium: boolean;
  isVerified: boolean;
  profileImage?: string;
  followersCount: number;
  followingsCount: number;
  isFollowedByUser: boolean;
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

export type GetUserNovelsByIdParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetUserNovelsByIdResponse = Paginated<Novel>;

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

export type GetCurrentUserStoriesParams = {
  page?: number;
  limit?: number;
};

export type GetCurrentUserStoriesResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  stories: Story[];
};

export type GetCurrentUserNovelsParams = {
  page?: number;
  limit?: number;
};

export type GetCurrentUserNovelsResponse = Paginated<Novel>;

export type GetUserPrivateStoryCountResponse = {
  count: number;
  max: number;
};

export type FollowParams = {
  id: number;
};

export type UnfollowParams = {
  id: number;
};

export type GetUserFollowersListParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetUserFollowersListResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  followers: User[];
};

export type GetUserFollowingsListParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetUserFollowingsListResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  followings: User[];
};

export type UploadUserProfileBody = {
  image: File;
};

export type UploadUserProfileResponse = {
  url: string;
};

export type GetUserChatsParams = {
  page?: number;
  limit?: number;
};

export type GetUserChatsResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  chats: Chat[];
};
