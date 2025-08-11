import { NOVELS_QUERY_KEYS } from "./constants";
import { NovelComment } from "@/services/comments/types";
import { USER_QUERY_KEYS } from "@/services/user/constants";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  addNovelComment,
  createNewChapter,
  createNewNovel,
  deleteNovel,
  dislikeNovel,
  editChapter,
  editNovel,
  getAuthorOtherNovels,
  getChapterById,
  getNovelById,
  getNovelComments,
  getNovelLikers,
  getNovels,
  likeNovel,
  publishNovel,
  reportNovel,
  shareNovel,
  unPublishNovel,
  uploadCoverImage,
} from "./functionts";
import type {
  Novel,
  GetNovelByIdParams,
  PublishNovelParams,
  CreateNewNovelResponse,
  EditNovelBody,
  UnPublishNovelParams,
  CreateNewChapterResponse,
  UploadCoverImageBody,
  EditChapterBody,
  EditChapterResponse,
  GetChapterByIdParams,
  GetNovelsParams,
  CreateNewChapterBody,
  GetNovelCommentsParams,
  LikeNovelParams,
  GetNovelsResponse,
  DislikeNovelParams,
  GetNovelLikersParams,
  GetAuthorOtherNovelsParams,
} from "./types";

export function useGetInfiniteNovels(params?: GetNovelsParams) {
  return useInfiniteQuery({
    initialPageParam: params || { page: 1, limit: 5 },
    queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS, params],
    queryFn: ({ pageParam }) => getNovels(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useGetNovelById(params: GetNovelByIdParams) {
  return useQuery({
    queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params],
    queryFn: () => getNovelById(params),
  });
}

export function useCreateNewNovel(options?: { onSuccess?: (res: CreateNewNovelResponse) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createNewNovel,
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER_NOVELS] });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.GET_USER_NOVELS_BY_ID],
        exact: false,
      });

      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS], exact: false });
    },
  });
}

export function useEditNovel(
  params: Pick<EditNovelBody, "id">,
  options?: { onSuccess?: (res: Novel) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editNovel,
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER_NOVELS] });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.GET_USER_NOVELS_BY_ID],
        exact: false,
      });

      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS], exact: false });
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] });
    },
  });
}

export function usePublishNovel(
  params: PublishNovelParams,
  options?: { onSuccess?: (res: Novel) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => publishNovel(params),
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER_NOVELS] });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.GET_USER_NOVELS_BY_ID],
        exact: false,
      });

      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS], exact: false });
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] });
    },
  });
}

export function useUnPublishNovel(
  params: UnPublishNovelParams,
  options?: { onSuccess?: (res: Novel) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unPublishNovel(params),
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER_NOVELS] });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.GET_USER_NOVELS_BY_ID],
        exact: false,
      });

      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS], exact: false });
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] });
    },
  });
}

export function useDeleteNovel(options?: { onSuccess?: (res: Novel) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNovel,
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER_NOVELS] });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.GET_USER_NOVELS_BY_ID],
        exact: false,
      });

      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS], exact: false });
    },
  });
}

export function useGetInfiniteNovelComments(params: GetNovelCommentsParams) {
  return useInfiniteQuery({
    initialPageParam: params,
    queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_COMMENTS, params],
    queryFn: ({ pageParam }) => getNovelComments(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { id: params.id, page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useAddNovelComment(options?: { onSuccess?: (res: NovelComment) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNovelComment,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_COMMENTS] });
    },
  });
}

export function useLikeNovel(params: LikeNovelParams, options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeNovel(params),
    onSuccess: () => {
      options?.onSuccess?.();

      queryClient.setQueriesData(
        { queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS] },
        (oldData: InfiniteData<GetNovelsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              stories: page.items.map((novel) =>
                novel.id === params.id
                  ? { ...novel, likesCount: novel.likesCount + 1, isLikedByUser: true }
                  : novel
              ),
            })),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] },
        (oldData: Novel | undefined) => {
          if (!oldData) return oldData;

          return { ...oldData, likesCount: oldData.likesCount + 1, isLikedByUser: true };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [USER_QUERY_KEYS.GET_USER_STORIES_BY_ID] },
        (oldData: InfiniteData<GetNovelsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              stories: page.items.map((novel) =>
                novel.id === params.id
                  ? { ...novel, likesCount: novel.likesCount + 1, isLikedByUser: true }
                  : novel
              ),
            })),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_LIKERS, params] });
    },
  });
}

export function useDislikeNovel(params: DislikeNovelParams, options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => dislikeNovel(params),
    onSuccess: () => {
      options?.onSuccess?.();

      queryClient.setQueriesData(
        { queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS] },
        (oldData: InfiniteData<GetNovelsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              stories: page.items.map((novel) =>
                novel.id === params.id
                  ? { ...novel, likesCount: novel.likesCount - 1, isLikedByUser: false }
                  : novel
              ),
            })),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] },
        (oldData: Novel | undefined) => {
          if (!oldData) return oldData;

          return { ...oldData, likesCount: oldData.likesCount - 1, isLikedByUser: false };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [USER_QUERY_KEYS.GET_USER_STORIES_BY_ID] },
        (oldData: InfiniteData<GetNovelsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              stories: page.items.map((novel) =>
                novel.id === params.id
                  ? { ...novel, likesCount: novel.likesCount - 1, isLikedByUser: false }
                  : novel
              ),
            })),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_LIKERS, params] });
    },
  });
}

export function useGetNovelLikers(params: GetNovelLikersParams, options?: { enabled?: boolean }) {
  return useInfiniteQuery({
    ...options,
    initialPageParam: { id: params.id, page: 1, limit: 5 },
    queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_LIKERS, params],
    queryFn: ({ pageParam }) => getNovelLikers(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { id: params.id, page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useShareNovel(options?: { onSuccess?: () => void }) {
  return useMutation({ ...options, mutationFn: shareNovel });
}

export function useReportNovel(options?: { onSuccess?: () => void }) {
  return useMutation({ ...options, mutationFn: reportNovel });
}

export function useGetAuthorOtherNovels(params: GetAuthorOtherNovelsParams) {
  return useQuery({
    queryFn: () => getAuthorOtherNovels(params),
    queryKey: [NOVELS_QUERY_KEYS.GET_AUTHOR_OTHER_NOVELS, params],
  });
}

export function useGetChapterById(params: GetChapterByIdParams) {
  return useQuery({
    queryKey: [NOVELS_QUERY_KEYS.GET_CHAPTER_BY_ID, params],
    queryFn: () => getChapterById(params),
  });
}

export function useCreateNewChapter(
  body: Pick<CreateNewChapterBody, "id">,
  options?: {
    onSuccess?: (res: CreateNewChapterResponse) => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createNewChapter,
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER_NOVELS] });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.GET_USER_NOVELS_BY_ID],
        exact: false,
      });

      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS], exact: false });
      queryClient.invalidateQueries({
        queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, { id: body.id }],
      });
    },
  });
}

export function useEditChapter(
  params: Pick<EditChapterBody, "id" | "chapterId">,
  options?: { onSuccess?: (res: EditChapterResponse) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editChapter,
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER_NOVELS] });
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.GET_USER_NOVELS_BY_ID],
        exact: false,
      });

      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_CHAPTER_BY_ID, params] });
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVELS], exact: false });
      queryClient.invalidateQueries({ queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] });
    },
  });
}

export function useUploadCoverImage(params: Pick<UploadCoverImageBody, "id">) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCoverImage,
    onSuccess: (res) => {
      queryClient.setQueriesData(
        { queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_BY_ID, params] },
        (oldData: Novel | undefined) => {
          if (!oldData) return oldData;

          return { ...oldData, coverImage: res.url };
        }
      );
    },
  });
}
