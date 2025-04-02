"use client";

import { useMemo } from "react";
import { Comment, CommentSkeleton } from "@/components/Comment";
import { useGetUserCommentsById } from "@/services/user";

type UserCommentsProps = {
  id: number;
};

export default function UserComments({ id }: UserCommentsProps) {
  const { data, isFetching } = useGetUserCommentsById({ id });

  const comments = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.comments ?? []) : [];
  }, [data?.pages]);

  return (
    <section className="divide-y divide-border">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} className="pb-6 not-first:pt-6" />
      ))}

      {isFetching && (
        <>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <CommentSkeleton key={index} className="flex gap-x-2 pb-6 not-first:pt-6" />
            ))}
        </>
      )}
    </section>
  );
}
