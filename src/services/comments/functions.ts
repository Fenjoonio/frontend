import http from "@/lib/utils/http";
import type { Comment, DeleteCommentParams, EditCommentBody } from "./types";

export async function editComment({ id, ...body }: EditCommentBody) {
  const response = await http.put<Comment>(`v1/comments/${id}`, body);

  return response.data;
}

export async function deleteComment(params: DeleteCommentParams) {
  const response = await http.delete(`v1/comments/${params.id}`);

  return response.data;
}
