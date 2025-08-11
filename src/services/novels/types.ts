import type { User } from "@/services/user";

export type Chapter = {
  id: number;
  title: string;
};

export type Novel = {
  id: number;
  chapters: Chapter[];
  user: User;
  coverImage: string;
  createdAt: string;
  description: string;
  commentsCount: number;
  isDeletableByUser: boolean;
  isEditableByUser: boolean;
  isPublishableByUser: boolean;
  isPublished: boolean;
  publishedAt: string;
  title: string;
};

export type GetNovelsParams = {
  page?: number;
  limit?: number;
};

export type GetNovelsResponse = Paginated<Novel>;

export type GetNovelByIdParams = {
  id: number;
};

export type GetNovelByIdResponse = {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  chapters: {
    id: number;
    title: string;
    text: string;
    jsonContent: string;
    isPublished: boolean;
    createdAt: string;
  }[];
  user: User;
  isPublished: boolean;
  isEditableByUser: boolean;
  isPublishableByUser: boolean;
  isDeletableByUser: boolean;
  publishedAt: string | null;
  createdAt: string;
};

export type GetNovelChaptersParams = {
  id: number;
};

export type CreateNewNovelBody = {
  title: string;
  description: string;
  chapters?: {
    text: string;
    title: string;
    jsonContent: string;
  }[];
};

export type CreateNewNovelResponse = {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  chapters: {
    id: number;
    title: string;
    text: string;
    jsonContent: string;
    isPublished: boolean;
    createdAt: string;
  }[];
  user: User;
  isPublished: boolean;
  isEditableByUser: boolean;
  isPublishableByUser: boolean;
  isDeletableByUser: boolean;
  publishedAt: string | null;
  createdAt: string;
};

export type EditNovelBody = {
  id: number;
  title: string;
  description: string;
};

export type PublishNovelParams = {
  id: number;
};

export type UnPublishNovelParams = {
  id: number;
};

export type DeleteNovelParams = {
  id: number;
};

export type GetNovelCommentsParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetNovelCommentsResponse = Paginated<NovelComment>;

export type AddNovelCommentBody = {
  id: string;
  text: string;
};

export type LikeNovelParams = {
  id: number;
};

export type DislikeNovelParams = {
  id: number;
};

export type GetNovelLikersParams = {
  id: number;
  page?: number;
  limit?: number;
};

export type GetNovelLikersResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  users: User[];
};

export type ShareNovelParams = {
  id: number;
};

export type ReportNovelBody = {
  id: number;
  reason: string;
};

export type GetAuthorOtherNovelsParams = {
  id: number;
};

export type GetAuthorOtherNovelsResponse = Novel[];

export type GetChapterByIdParams = {
  id: number;
  chapterId: number;
};

export type GetChapterByIdResponse = {
  chapter: {
    id: number;
    text: string;
    title: string;
    createdAt: string;
    jsonContent: string;
    publishedAt: string;
    isPublished: boolean;
  };
  hasNext: boolean;
};

export type CreateNewChapterBody = {
  id: number;
  text: string;
  title: string;
  jsonContent: string;
};

export type CreateNewChapterResponse = {
  id: number;
  text: string;
  title: string;
  createdAt: string;
  jsonContent: string;
  publishedAt: string;
  isPublished: boolean;
};

export type EditChapterBody = {
  id: number;
  text: string;
  title: string;
  chapterId: number;
  jsonContent: string;
};

export type EditChapterResponse = {
  id: number;
  text: string;
  title: string;
  createdAt: string;
  jsonContent: string;
  publishedAt: string;
  isPublished: boolean;
};

export type UploadCoverImageBody = {
  id: number;
  image: File;
};

export type UploadCoverImageResponse = {
  url: string;
};
