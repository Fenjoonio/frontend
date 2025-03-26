"use client";

import { useMemo } from "react";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { type Comment } from "@/services/comments";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { useGetUserCommentsById } from "@/services/user";

type UserCommentsProps = {
  id: number;
};

export default function UserComments({ id }: UserCommentsProps) {
  const { data, isFetching } = useGetUserCommentsById({ id });

  const comments = useMemo<Comment[]>(() => {
    return data?.pages ? data.pages.flatMap((page) => page.comments ?? []) : [];
  }, [data?.pages]);

  return (
    <section className="divide-y divide-[#505050]">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-x-2 pb-6 not-first:pt-6">
          <UserAvatar user={comment.user} />

          <div className="flex-1 mt-1">
            <div className="flex gap-x-2 items-center">
              <span className="font-bold">{getUserName(comment.user)}</span>
              <span className="w-1 h-1 bg-[#505050] rounded-sm"></span>
              <span className="text-[10px] text-[#B0B0B0]">
                {formatStoryCreateAt(comment.createdAt)}
              </span>
            </div>

            <p className="w-full text-sm text-[#B0B0B0] whitespace-pre-line line-clamp-6 leading-6 mt-1">
              {comment.text}
            </p>
          </div>
        </div>
      ))}

      {isFetching && (
        <>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex gap-x-2 pb-6 not-first:pt-6">
                <div>
                  <div className="w-7 h-7 bg-[#505050] opacity-40 rounded-lg animate-pulse"></div>
                </div>
                <div className="flex-1 mt-1">
                  <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
                  <div className="w-full h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
                  <div className="w-[80%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
                </div>
              </div>
            ))}
        </>
      )}
    </section>
  );
}
