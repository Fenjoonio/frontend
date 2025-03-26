import { COMMENTS_QUERY_KEYS } from "./constants";
import { useMutation } from "@tanstack/react-query";
import type { Comment, EditCommentBody } from "./types";
import { deleteComment, editComment } from "./functions";

export function useEditComment(
  params: Pick<EditCommentBody, "id">,
  options?: { onSuccess?: (res: Comment) => void }
) {
  return useMutation({
    ...options,
    mutationKey: [COMMENTS_QUERY_KEYS.EDIT_COMMENT, params],
    mutationFn: editComment,
  });
}

export function useDeleteComment(options?: { onSuccess?: (res: unknown) => void }) {
  return useMutation({
    ...options,
    mutationKey: [COMMENTS_QUERY_KEYS.DELETE_COMMENT],
    mutationFn: deleteComment,
  });
}
