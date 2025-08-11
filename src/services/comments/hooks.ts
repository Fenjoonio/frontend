import { USER_QUERY_KEYS } from "@/services/user";
import { COMMENTS_QUERY_KEYS } from "./constants";
import { STORIES_QUERY_KEYS } from "@/services/stories";
import type { GetStoryCommentsResponse } from "@/services/stories/types";
import type { GetUserCommentsByIdResponse } from "@/services/user/types";
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  dislikeComment,
  editComment,
  getCommentLikers,
  likeComment,
} from "./functions";
import type {
  Comment,
  DislikeCommentParams,
  GetCommentLikersParams,
  LikeCommentParams,
} from "./types";

export function useEditComment(options?: { onSuccess?: (res: Comment) => void }) {
  return useMutation({ ...options, mutationFn: editComment });
}

export function useDeleteComment(options?: { onSuccess?: (res: unknown) => void }) {
  return useMutation({ ...options, mutationFn: deleteComment });
}

export function useLikeComment(params: LikeCommentParams, options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeComment(params),
    onSuccess: () => {
      options?.onSuccess?.();

      queryClient.setQueriesData(
        { queryKey: [STORIES_QUERY_KEYS.GET_STORY_COMMENTS] },
        (oldData: InfiniteData<GetStoryCommentsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.items.map((comment) =>
                comment.id === params.id
                  ? { ...comment, likesCount: comment.likesCount + 1, isLikedByUser: true }
                  : comment
              ),
            })),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [USER_QUERY_KEYS.GET_USER_COMMENTS_BY_ID] },
        (oldData: InfiniteData<GetUserCommentsByIdResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.items.map((comment) =>
                comment.id === params.id
                  ? { ...comment, likesCount: comment.likesCount + 1, isLikedByUser: true }
                  : comment
              ),
            })),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERY_KEYS.GET_COMMENT_LIKERS, params] });
    },
  });
}

export function useDislikeComment(
  params: DislikeCommentParams,
  options?: { onSuccess?: () => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => dislikeComment(params),
    onSuccess: () => {
      options?.onSuccess?.();

      queryClient.setQueriesData(
        { queryKey: [STORIES_QUERY_KEYS.GET_STORY_COMMENTS] },
        (oldData: InfiniteData<GetStoryCommentsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.items.map((comment) =>
                comment.id === params.id
                  ? { ...comment, likesCount: comment.likesCount - 1, isLikedByUser: false }
                  : comment
              ),
            })),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [USER_QUERY_KEYS.GET_USER_COMMENTS_BY_ID] },
        (oldData: InfiniteData<GetUserCommentsByIdResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.items.map((comment) =>
                comment.id === params.id
                  ? { ...comment, likesCount: comment.likesCount - 1, isLikedByUser: false }
                  : comment
              ),
            })),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERY_KEYS.GET_COMMENT_LIKERS, params] });
    },
  });
}

export function useGetCommentLikers(
  params: GetCommentLikersParams,
  options?: { enabled?: boolean }
) {
  return useInfiniteQuery({
    ...options,
    initialPageParam: { id: params.id, page: 1, limit: 5 },
    queryKey: [COMMENTS_QUERY_KEYS.GET_COMMENT_LIKERS, params],
    queryFn: ({ pageParam }) => getCommentLikers(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { id: params.id, page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}
