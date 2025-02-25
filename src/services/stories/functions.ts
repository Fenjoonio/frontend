import http from "@/lib/utils/http";
import type {
  AddNewStoryBody,
  AddNewStoryResponse,
  GetStoriesParams,
  GetStoriesResponse,
} from "./types";

export async function getStories(params: GetStoriesParams) {
  const response = await http.get<GetStoriesResponse>("/v1/stories", { params });

  return response.data;
}

export async function addNewStory(body: AddNewStoryBody) {
  const response = await http.post<AddNewStoryResponse>("/v1/stories", body, { throwError: true });

  return response.data;
}
