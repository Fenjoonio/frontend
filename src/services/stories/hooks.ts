import { addNewStory, getStories } from "./functions";
import type { AddNewStoryResponse, GetStoriesParams } from "./types";
import { STORIES_QUERY_KEYS } from "./constants";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
