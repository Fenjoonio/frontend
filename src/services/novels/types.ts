import type { User } from "@/services/user";

export type Chapter = {
  id: number;
  title: string;
};

export type Novel = {
  id: number;
  chapters: Chapter[];
  user: User;
};

export type GetNovelsParams = {
  page: number;
  limit: number;
};

export type GetNovelsResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  novels: Novel[];
};

export type GetNovelByIdParams = {
  id: number;
};

export type GetNovelChaptersParams = {
  id: number;
};
