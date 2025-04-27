import { STORIES_QUERY_KEYS } from "./constants";
import { type Comment } from "@/services/comments";
import {
  addNewStory,
  addStoryComment,
  changeStoryVisibility,
  deleteStory,
  dislikeStory,
  editStory,
  getAuthorOtherStories,
  getSingleStory,
  getStories,
  getStoryComments,
  getStoryLikers,
  likeStory,
  reportStory,
  shareStory,
  writeStoryWithAi,
} from "./functions";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import type {
  Story,
  AddNewStoryResponse,
  DeleteStoryResponse,
  DislikeStoryParams,
  EditStoryBody,
  GetSingleStoryParams,
  GetStoriesParams,
  GetStoryCommentsParams,
  LikeStoryParams,
  GetStoryLikersParams,
  GetStoriesResponse,
  GetAuthorOtherStoriesParams,
  ChangeStoryVisibilityBody,
} from "./types";
import { USER_QUERY_KEYS } from "../user/constants";

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
    mutationKey: [STORIES_QUERY_KEYS.LIKE_STORY, params],
    mutationFn: () => likeStory(params),
    onSuccess: () => {
      options?.onSuccess?.();

      queryClient.setQueriesData(
        { queryKey: [STORIES_QUERY_KEYS.GET_STORIES] },
        (oldData: InfiniteData<GetStoriesResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              stories: page.stories.map((story) =>
                story.id === params.id
                  ? { ...story, likesCount: story.likesCount + 1, isLikedByUser: true }
                  : story
              ),
            })),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [STORIES_QUERY_KEYS.GET_SINGLE_STORY, params] },
        (oldData: Story | undefined) => {
          if (!oldData) return oldData;

          return { ...oldData, likesCount: oldData.likesCount + 1, isLikedByUser: true };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [USER_QUERY_KEYS.GET_USER_STORIES_BY_ID] },
        (oldData: InfiniteData<GetStoriesResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              stories: page.stories.map((story) =>
                story.id === params.id
                  ? { ...story, likesCount: story.likesCount + 1, isLikedByUser: true }
                  : story
              ),
            })),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORY_LIKERS, params] });
    },
  });
}

export function useDislikeStory(params: DislikeStoryParams, options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [STORIES_QUERY_KEYS.DISLIKE_STORY, params],
    mutationFn: () => dislikeStory(params),
    onSuccess: () => {
      options?.onSuccess?.();

      queryClient.setQueriesData(
        { queryKey: [STORIES_QUERY_KEYS.GET_STORIES] },
        (oldData: InfiniteData<GetStoriesResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              stories: page.stories.map((story) =>
                story.id === params.id
                  ? { ...story, likesCount: story.likesCount - 1, isLikedByUser: false }
                  : story
              ),
            })),
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [STORIES_QUERY_KEYS.GET_SINGLE_STORY, params] },
        (oldData: Story | undefined) => {
          if (!oldData) return oldData;

          return { ...oldData, likesCount: oldData.likesCount - 1, isLikedByUser: false };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [USER_QUERY_KEYS.GET_USER_STORIES_BY_ID] },
        (oldData: InfiniteData<GetStoriesResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              stories: page.stories.map((story) =>
                story.id === params.id
                  ? { ...story, likesCount: story.likesCount - 1, isLikedByUser: false }
                  : story
              ),
            })),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORY_LIKERS, params] });
    },
  });
}

export function useGetStoryLikers(params: GetStoryLikersParams, options?: { enabled?: boolean }) {
  return useInfiniteQuery({
    ...options,
    initialPageParam: { id: params.id, page: 1, limit: 5 },
    queryKey: [STORIES_QUERY_KEYS.GET_STORY_LIKERS, params],
    queryFn: ({ pageParam }) => getStoryLikers(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { id: params.id, page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
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

export function useReportStory(options?: { onSuccess?: () => void }) {
  return useMutation({
    ...options,
    mutationKey: [STORIES_QUERY_KEYS.REPORT_STORY],
    mutationFn: reportStory,
  });
}

export function useChangeStoryVisibility(
  params: Pick<ChangeStoryVisibilityBody, "id">,
  options?: { onSuccess?: () => void }
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationKey: [STORIES_QUERY_KEYS.CHANGE_STORY_VISIBILITY],
    mutationFn: changeStoryVisibility,
    onSuccess: () => {
      options?.onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: [STORIES_QUERY_KEYS.GET_SINGLE_STORY, { id: params.id }],
      });
    },
  });
}

export function useGetAuthorOtherStories(params: GetAuthorOtherStoriesParams) {
  return useQuery({
    queryFn: () => getAuthorOtherStories(params),
    queryKey: [STORIES_QUERY_KEYS.GET_AUTHOR_OTHER_STORIES, params],
  });
}

export function useWriteStoryWithAi(options?: {
  onSuccess?: (res: string) => void;
  onError?: (err: unknown) => void;
}) {
  return useMutation({
    ...options,
    mutationKey: [STORIES_QUERY_KEYS.WRITE_STORY_WITH_AI],
    mutationFn: writeStoryWithAi,
  });
}
