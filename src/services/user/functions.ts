import http from "@/lib/utils/http";
import type {
  User,
  GetUserByIdParams,
  GetUserStoriesByIdParams,
  GetUserStoriesByIdResponse,
  GetUserCommentsByIdParams,
  GetUserCommentsByIdResponse,
  GetCurrentUserStoriesResponse,
  GetCurrentUserStoriesParams,
  GetUserPrivateStoryCountResponse,
  FollowParams,
  UnfollowParams,
  GetUserFollowersListParams,
  GetUserFollowersListResponse,
  GetUserFollowingsListParams,
  GetUserFollowingsListResponse,
  UploadUserProfileBody,
  UploadUserProfileResponse,
  GetUserChatsParams,
  GetUserChatsResponse,
  GetCurrentUserBookmarksParams,
  GetCurrentUserBookmarksResponse,
} from "./types";

export async function getCurrentUser() {
  const response = await http.get<User>("v1/users/me", { throwHttpErrors: false });

  return response.data;
}

export async function updateCurrentUser(body: Pick<User, "firstName" | "lastName" | "nickname">) {
  const response = await http.patch<User>("v1/users/me", body);

  return response.data;
}

export async function getUserById(params: GetUserByIdParams) {
  const response = await http.get<User>(`v1/users/${params.id}`);

  return response.data;
}

export async function getUserStoriesById({ id, ...params }: GetUserStoriesByIdParams) {
  const response = await http.get<GetUserStoriesByIdResponse>(`v1/users/${id}/stories`, {
    searchParams: params,
  });

  return response.data;
}

export async function getUserCommentsById({ id, ...params }: GetUserCommentsByIdParams) {
  const response = await http.get<GetUserCommentsByIdResponse>(`v1/users/${id}/comments`, {
    searchParams: params,
  });

  return response.data;
}

export async function getCurrentUserStories(params: GetCurrentUserStoriesParams) {
  const response = await http.get<GetCurrentUserStoriesResponse>("v1/users/me/stories", {
    searchParams: params,
  });

  return response.data;
}

export async function getCurrentUserBookmarks(params: GetCurrentUserBookmarksParams) {
  const response = await http.get<GetCurrentUserBookmarksResponse>("v1/users/me/bookmarks", {
    searchParams: params,
  });

  return response.data;
}

export async function getUserPrivateStoryCount() {
  const response = await http.get<GetUserPrivateStoryCountResponse>(
    "v1/users/me/private-story-count",
  );

  return response.data;
}

export async function follow({ id }: FollowParams) {
  const response = await http.post<true>(`v1/users/${id}/follow`);

  return response.data;
}

export async function unfollow({ id }: UnfollowParams) {
  const response = await http.delete<true>(`v1/users/${id}/unfollow`);

  return response.data;
}

export async function getUserFollowersList({ id, ...params }: GetUserFollowersListParams) {
  const response = await http.get<GetUserFollowersListResponse>(`v1/users/${id}/followers`, {
    searchParams: params,
  });

  return response.data;
}

export async function getUserFollowingsList({ id, ...params }: GetUserFollowingsListParams) {
  const response = await http.get<GetUserFollowingsListResponse>(`v1/users/${id}/followings`, {
    searchParams: params,
  });

  return response.data;
}

export async function uploadUserProfile(body: UploadUserProfileBody) {
  const formData = new FormData();
  formData.append("image", body.image);

  const response = await http.post<UploadUserProfileResponse>(
    `v1/users/me/profile-image`,
    undefined,
    {
      body: formData,
    },
  );

  return response.data;
}

export async function getUserChats(params: GetUserChatsParams) {
  const response = await http.get<GetUserChatsResponse>("v1/users/me/chats", {
    searchParams: params,
  });

  return response.data;
}
