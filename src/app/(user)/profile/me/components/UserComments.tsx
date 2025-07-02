"use client";

import { useMemo } from "react";
import { Comment, CommentSkeleton } from "@/components/Comment";
import { useGetCurrentUser, useGetUserCommentsById } from "@/services/user";
import InfiniteScroll from "react-infinite-scroll-component";

export default function UserComments() {
  const {data: currentUser } = useGetCurrentUser()
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetUserCommentsById({
    id: currentUser?.id || 0,
    page: 1,
    limit: 10,
  });

  const comments = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.comments ?? []) : [];
  }, [data?.pages]);

  return (
    <InfiniteScroll
      next={fetchNextPage}
      dataLength={comments.length}
      hasMore={isFetching || hasNextPage}
      loader={
        <>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <CommentSkeleton key={index} className="flex gap-x-2 pb-6 not-first:pt-6" />
            ))}
        </>
      }
      className="divide-y divide-border"
    >
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} className="pb-6 not-first:pt-6" />
      ))}
    </InfiniteScroll>
  );
}
