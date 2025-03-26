import http from "@/lib/utils/http";
import type { Comment, EditCommentBody } from "./types";

export async function editComment({ id, ...body }: EditCommentBody) {
  const response = await http.put<Comment>(`v1/comments/${id}`, body);

  return response.data;
}
