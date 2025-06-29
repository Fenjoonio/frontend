import { STORIES_QUERY_KEYS } from "../stories";
import { CAMPAIGN_QUERY_KEYS } from "./constants";
import { addCampaignStory, getCampaignLeaderboard, getCampaignStories } from "./functions";
import type { AddNewStoryResponse, GetStoriesParams } from "../stories/types";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddCampaignStory(options?: { onSuccess?: (res: AddNewStoryResponse) => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCampaignStory,
    onSuccess: (response) => {
      options?.onSuccess?.(response);
      queryClient.invalidateQueries({ queryKey: [CAMPAIGN_QUERY_KEYS.GET_CAMPAIGN_STORIES], exact: false });
      queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORIES], exact: false });
    },
  });
}


export function useGetCampaignStories(params?: GetStoriesParams) {
  return useInfiniteQuery({
    initialPageParam: params || { page: 1, limit: 5 },
    queryKey: [CAMPAIGN_QUERY_KEYS.GET_CAMPAIGN_STORIES, params],
    queryFn: ({ pageParam }) => getCampaignStories(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useGetCampaignLeaderboard() {
  return useQuery({
    queryFn: getCampaignLeaderboard,
    queryKey: [CAMPAIGN_QUERY_KEYS.GET_CAMPAIGN_LEADERBOARD],
  });
}