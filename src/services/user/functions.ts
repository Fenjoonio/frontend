import http from "@/lib/utils/http";
import type {
  User,
  GetUserByIdParams,
  GetUserStoriesByIdParams,
  GetUserStoriesByIdResponse,
  GetUserCommentsByIdParams,
  GetUserCommentsByIdResponse,
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
