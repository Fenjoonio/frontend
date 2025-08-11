import { COMMENTS_QUERY_KEYS } from "./constants";
import { NOVELS_QUERY_KEYS } from "@/services/novels";
import { STORIES_QUERY_KEYS } from "@/services/stories";
import { USER_QUERY_KEYS } from "@/services/user/constants";
import { GetStoryCommentsResponse } from "@/services/stories/types";
import { GetUserCommentsByIdResponse } from "@/services/user/types";
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
  EditCommentBody,
  GetCommentLikersParams,
  LikeCommentParams,
} from "./types";

export function useEditComment(
  params: Pick<EditCommentBody, "id">,
  options?: { onSuccess?: (res: Comment) => void }
) {
  return useMutation({
    ...options,
    mutationKey: [COMMENTS_QUERY_KEYS.EDIT_COMMENT, params],
    mutationFn: editComment,
  });
}

export function useDeleteComment(options?: { onSuccess?: (res: unknown) => void }) {
  return useMutation({
    ...options,
    mutationKey: [COMMENTS_QUERY_KEYS.DELETE_COMMENT],
    mutationFn: deleteComment,
  });
}

export function useLikeComment(params: LikeCommentParams, options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [COMMENTS_QUERY_KEYS.LIKE_COMMENT, params],
    mutationFn: () => likeComment(params),
    onSuccess: () => {
      options?.onSuccess?.();

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

      queryClient.setQueriesData(
        { queryKey: [STORIES_QUERY_KEYS.GET_STORY_COMMENTS] },
        (oldData: InfiniteData<GetStoryCommentsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((comment) =>
                comment.id === params.id
                  ? { ...comment, likesCount: comment.likesCount + 1, isLikedByUser: true }
                  : comment
              ),
            })),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_COMMENTS] },
        (oldData: InfiniteData<GetStoryCommentsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((comment) =>
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
    mutationKey: [COMMENTS_QUERY_KEYS.DISLIKE_COMMENT, params],
    mutationFn: () => dislikeComment(params),
    onSuccess: () => {
      options?.onSuccess?.();

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

      queryClient.setQueriesData(
        { queryKey: [STORIES_QUERY_KEYS.GET_STORY_COMMENTS] },
        (oldData: InfiniteData<GetStoryCommentsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((comment) =>
                comment.id === params.id
                  ? { ...comment, likesCount: comment.likesCount - 1, isLikedByUser: false }
                  : comment
              ),
            })),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_COMMENTS] },
        (oldData: InfiniteData<GetStoryCommentsResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((comment) =>
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
