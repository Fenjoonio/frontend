import { STORIES_QUERY_KEYS } from "./constants";
import {
  addNewStory,
  addStoryComment,
  deleteStory,
  getSingleStory,
  getStories,
  getStoryComments,
} from "./functions";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AddNewStoryResponse,
  Comment,
  DeleteStoryResponse,
  GetSingleStoryParams,
  GetStoriesParams,
  GetStoryCommentsParams,
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
