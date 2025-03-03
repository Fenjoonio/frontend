import type { User } from "@/services/user";

export type Story = {
  id: number;
  text: string;
  user: User;
  createdAt: string;
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

export type GetSingleStoryParams = {
  id: number;
};
