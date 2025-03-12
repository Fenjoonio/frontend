import { STORIES_QUERY_KEYS } from "./constants";
import {
  addNewStory,
  addStoryComment,
  deleteStory,
  dislikeStory,
  editStory,
  getSingleStory,
  getStories,
  getStoryComments,
  likeStory,
  shareStory,
} from "./functions";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Story,
  Comment,
  AddNewStoryResponse,
  DeleteStoryResponse,
  DislikeStoryParams,
  EditStoryBody,
  GetSingleStoryParams,
  GetStoriesParams,
  GetStoryCommentsParams,
  LikeStoryParams,
  ShareStoryParams,
} from "./types";

export function useGetInfiniteStories(params?: GetStoriesParams) {
  return useInfiniteQuery({
    initialPageParam: params || { page: 1, limit: 5 },
    queryKey: [STORIES_QUERY_KEYS.GET_STORIES, params],
    queryFn: ({ pageParam }) => getStories(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useGetSingleStory(params: GetSingleStoryParams) {
  return useQuery({
    queryFn: () => getSingleStory(params),
    queryKey: [STORIES_QUERY_KEYS.GET_SINGLE_STORY, params],
  });
}

export function useAddNewStory(options?: { onSuccess?: (res: AddNewStoryResponse) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [STORIES_QUERY_KEYS.ADD_NEW_STORY],
    mutationFn: addNewStory,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORIES] });
    },
  });
}

export function useEditStory(
  params: Pick<EditStoryBody, "id">,
  options?: { onSuccess?: (res: Story) => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [STORIES_QUERY_KEYS.EDIT_STORY, params],
    mutationFn: editStory,
    onSuccess: (response) => {
      options?.onSuccess?.(response);

      // TODO: Invalid only the current page
      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORIES], exact: false });
      queryClient.invalidateQueries({
        queryKey: [STORIES_QUERY_KEYS.GET_SINGLE_STORY, { id: params.id }],
      });
    },
  });
}

export function useDeleteStory(options?: { onSuccess?: (res: DeleteStoryResponse) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [STORIES_QUERY_KEYS.DELETE_STORY],
    mutationFn: deleteStory,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORIES] });
    },
  });
}

export function useGetInfiniteStoryComments(params: GetStoryCommentsParams) {
  return useInfiniteQuery({
    initialPageParam: params,
    queryKey: [STORIES_QUERY_KEYS.GET_STORY_COMMENTS, params],
    queryFn: ({ pageParam }) => getStoryComments(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { id: params.id, page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useAddStoryComment(options?: { onSuccess?: (res: Comment) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [STORIES_QUERY_KEYS.ADD_STORY_COMMENT],
    mutationFn: addStoryComment,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORY_COMMENTS] });
    },
  });
}

export function useLikeStory(params: LikeStoryParams, options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [STORIES_QUERY_KEYS.LIKE_STORY],
    mutationFn: () => likeStory(params),
    onSuccess: () => {
      options?.onSuccess?.();
      // TODO: Invalid only the current page
      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORIES], exact: false });
      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_SINGLE_STORY, params] });
    },
  });
}

export function useDislikeStory(params: DislikeStoryParams, options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [STORIES_QUERY_KEYS.DISLIKE_STORY],
    mutationFn: () => dislikeStory(params),
    onSuccess: () => {
      options?.onSuccess?.();
      // TODO: Invalid only the current page
      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORIES], exact: false });
      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_SINGLE_STORY, params] });
    },
  });
}

export function useShareStory(options?: { onSuccess?: () => void }) {
  return useMutation({
    ...options,
    mutationKey: [STORIES_QUERY_KEYS.SHARE_STORY],
    mutationFn: shareStory,
  });
}
