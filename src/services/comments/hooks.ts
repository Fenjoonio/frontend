import { COMMENTS_QUERY_KEYS } from "./constants";
import { useMutation } from "@tanstack/react-query";
import { deleteComment, dislikeComment, editComment, likeComment } from "./functions";
import type { Comment, DislikeCommentParams, EditCommentBody, LikeCommentParams } from "./types";

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

export function useLikeComment(params: LikeCommentParams, options?: { onSuccess?: () => void }) {
  return useMutation({
    ...options,
    mutationKey: [COMMENTS_QUERY_KEYS.LIKE_COMMENT, params],
    mutationFn: likeComment,
  });
}

export function useDislikeComment(
  params: DislikeCommentParams,
  options?: { onSuccess?: () => void }
) {
  return useMutation({
    ...options,
    mutationKey: [COMMENTS_QUERY_KEYS.DISLIKE_COMMENT, params],
    mutationFn: dislikeComment,
  });
}
