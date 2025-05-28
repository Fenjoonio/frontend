import http from "@/lib/utils/http";
import type { Leaderboard } from "./types";
import type {
  AddNewStoryBody,
  AddNewStoryResponse,
  GetStoriesParams,
  GetStoriesResponse,
} from "../stories/types";

export async function addCampaignStory(body: AddNewStoryBody) {
  const response = await http.post<AddNewStoryResponse>("v1/campaigns/stories", body);

  return response.data;
}

export async function getCampaignStories(params: GetStoriesParams) {
  const response = await http.get<GetStoriesResponse>("v1/campaigns/stories", {
    searchParams: params,
  });

  return response.data;
}

export async function getCampaignLeaderboard() {
  const response = await http.get<Leaderboard[]>("v1/campaigns/leaderboard");

  return response.data;
}
