import http from "@/lib/utils/http";
import type { Comment } from "@/services/comments/types";
import type {
  Story,
  AddNewStoryBody,
  DeleteStoryParams,
  AddNewStoryResponse,
  GetStoriesParams,
  GetStoriesResponse,
  GetSingleStoryParams,
  DeleteStoryResponse,
  GetStoryCommentsParams,
  GetStoryCommentsResponse,
  AddStoryCommentBody,
  LikeStoryParams,
  DislikeStoryParams,
  EditStoryBody,
  ShareStoryParams,
  StoryBookmark,
  ReportStoryBody,
  WriteStoryWithAiBody,
  GetStoryLikersParams,
  GetStoryLikersResponse,
  GetAuthorOtherStoriesParams,
  GetAuthorOtherStoriesResponse,
  DeleteStoryBookmark ,
  ChangeStoryVisibilityBody,
} from "./types";
import { isClientSide } from "@/lib/utils/environment";

export async function getStories(params: GetStoriesParams) {
  const response = await http.get<GetStoriesResponse>("v1/stories", { searchParams: params });

  return response.data;
}

export async function getSingleStory(params: GetSingleStoryParams) {
  const response = await http.get<Story>(`v1/stories/${params.id}`);

  return response.data;
}

export async function addNewStory(body: AddNewStoryBody) {
  const response = await http.post<AddNewStoryResponse>("v1/stories", body);

  return response.data;
}

export async function editStory({ id, ...body }: EditStoryBody) {
  const response = await http.put<Story>(`v1/stories/${id}`, body);

  return response.data;
}

export async function deleteStory(params: DeleteStoryParams) {
  const response = await http.delete<DeleteStoryResponse>(`v1/stories/${params.id}`);

  return response.data;
}

export async function getStoryComments({ id, ...params }: GetStoryCommentsParams) {
  const response = await http.get<GetStoryCommentsResponse>(`v1/stories/${id}/comments`, {
    searchParams: params,
  });

  return response.data;
}

export async function addStoryComment({ id, ...body }: AddStoryCommentBody) {
  const response = await http.post<Comment>(`v1/stories/${id}/comments`, body);

  return response.data;
}

export async function getStoryLikers({ id, ...params }: GetStoryLikersParams) {
  const response = await http.get<GetStoryLikersResponse>(`v1/stories/${id}/likes`, {
    searchParams: params,
  });

  return response.data;
}

export async function likeStory({ id }: LikeStoryParams) {
  const response = await http.post(`v1/stories/${id}/likes`);

  return response.data;
}

export async function dislikeStory({ id }: DislikeStoryParams) {
  const response = await http.delete(`v1/stories/${id}/likes`);

  return response.data;
}

export async function shareStory({ id }: ShareStoryParams) {
  const response = await http.post(`v1/stories/${id}/shares`);

  return response.data;
}

export async function reportStory({ id, ...body }: ReportStoryBody) {
  const response = await http.post<boolean>(`v1/stories/${id}/reports`, body);

  return response.data;
}

export async function changeStoryVisibility({ id, ...body }: ChangeStoryVisibilityBody) {
  const response = await http.patch<Story>(`v1/stories/${id}/visibility`, body);

  return response.data;
}

export async function addStoryBookmark({ id }: StoryBookmark) {
  const response = await http.post<StoryBookmark>(`v1/stories/${id}/bookmarks`);

  return response.data;
}

export async function deleteStoryBookmark({ id }:DeleteStoryBookmark) {
  const response = await http.delete<DeleteStoryBookmark>(`v1/stories/${id}/bookmarks`);

  return response.data;
}


export async function getAuthorOtherStories({ id }: GetAuthorOtherStoriesParams) {
  const response = await http.get<GetAuthorOtherStoriesResponse>(
    `v1/stories/${id}/related-by-author`
  );

  return response.data;
}

export async function writeStoryWithAi(body: WriteStoryWithAiBody) {
  const response = await http.post<string>("ai/story", body, {
    prefixUrl: isClientSide() ? "/api" : "http://localhost:3000/api",
  });

  return response.data;
}
