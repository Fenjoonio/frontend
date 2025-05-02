import { USER_QUERY_KEYS } from "./constants";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  getUserById,
  getUserCommentsById,
  getUserStoriesById,
  updateCurrentUser,
  getCurrentUserStories,
  getUserPrivateStoryCount,
  getUserFollowersList,
} from "./functions";
import type {
  GetCurrentUserStoriesParams,
  GetUserByIdParams,
  GetUserFollowersListParams,
  GetUserFollowingsListParams,
  GetUserStoriesByIdParams,
  User,
} from "./types";

export function useGetCurrentUser() {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
}

export function useUpdateCurrentUser(options?: {
  onSuccess?: (res: User) => void;
  onError?: (err: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationKey: [USER_QUERY_KEYS.UPDATE_CURRENT_USER],
    mutationFn: updateCurrentUser,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER] });
    },
  });
}

export function useGetCurrentUserStories(
  params: GetCurrentUserStoriesParams = { page: 1, limit: 10 }
) {
  return useInfiniteQuery({
    initialPageParam: params,
    queryKey: [USER_QUERY_KEYS.GET_CURRENT_USER_STORIES, params],
    queryFn: ({ pageParam }) => getCurrentUserStories(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useGetUserPrivateStoryCount() {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.GET_USER_PRIVATE_STORY_COUNT],
    queryFn: getUserPrivateStoryCount,
  });
}

export function useGetUserById(params: GetUserByIdParams) {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.GET_USER_BY_ID, params],
    queryFn: () => getUserById(params),
  });
}

export function useGetUserStoriesById(params: GetUserStoriesByIdParams) {
  return useInfiniteQuery({
    initialPageParam: params,
    queryKey: [USER_QUERY_KEYS.GET_USER_STORIES_BY_ID, params],
    queryFn: ({ pageParam }) => getUserStoriesById(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { id: params.id, page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useGetUserCommentsById(params: GetUserStoriesByIdParams) {
  return useInfiniteQuery({
    initialPageParam: params,
    queryKey: [USER_QUERY_KEYS.GET_USER_COMMENTS_BY_ID, params],
    queryFn: ({ pageParam }) => getUserCommentsById(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { id: params.id, page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getUserFollowersList,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.GET_USER_FOLLOWERS_LIST],
        exact: false,
      });

      queryClient.setQueriesData(
        { queryKey: [USER_QUERY_KEYS.GET_USER_BY_ID, { id: params.id }] },
        (oldData: User | undefined) => {
          if (!oldData) return oldData;

          return { ...oldData, isFollowedByUser: true, followersCount: oldData.followersCount + 1 };
        }
      );
    },
  });
}

export function useUnfollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getUserFollowersList,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.GET_USER_FOLLOWERS_LIST],
        exact: false,
      });

      queryClient.setQueriesData(
        { queryKey: [USER_QUERY_KEYS.GET_USER_BY_ID, { id: params.id }] },
        (oldData: User | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            isFollowedByUser: false,
            followersCount: oldData.followersCount - 1,
          };
        }
      );
    },
  });
}

export function useGetUserFollowersList(params: GetUserFollowersListParams) {
  return useInfiniteQuery({
    initialPageParam: params,
    queryKey: [USER_QUERY_KEYS.GET_USER_FOLLOWERS_LIST, params],
    queryFn: ({ pageParam }) => getUserFollowersList(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { id: params.id, page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useGetUserFollowingsList(params: GetUserFollowingsListParams) {
  return useInfiniteQuery({
    initialPageParam: params,
    queryKey: [USER_QUERY_KEYS.GET_USER_FOLLOWERS_LIST, params],
    queryFn: ({ pageParam }) => getUserFollowersList(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { id: params.id, page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}
