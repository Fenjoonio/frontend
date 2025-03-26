import http from "@/lib/utils/http";
import type {
  Comment,
  DeleteCommentParams,
  DislikeCommentParams,
  EditCommentBody,
  LikeCommentParams,
} from "./types";

export async function editComment({ id, ...body }: EditCommentBody) {
  const response = await http.put<Comment>(`v1/comments/${id}`, body);

  return response.data;
}

export async function deleteComment({ id }: DeleteCommentParams) {
  const response = await http.delete(`v1/comments/${id}`);

  return response.data;
}

export async function likeComment({ id }: LikeCommentParams) {
  const response = await http.post(`v1/comments/${id}/likes`);

  return response.data;
}

export async function dislikeComment({ id }: DislikeCommentParams) {
  const response = await http.delete(`v1/comments/${id}/likes`);

  return response.data;
}
