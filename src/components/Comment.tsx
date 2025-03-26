"use client";

import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils/classnames";
import { getUserName } from "@/lib/utils/users";
import { type Comment } from "@/services/comments";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import { useState } from "react";
import EditCommentDialog from "@/app/(comment)/components/EditCommentDialog";
import { useQueryClient } from "@tanstack/react-query";
import { STORIES_QUERY_KEYS } from "@/services/stories/constants";

type CommentProps = {
  comment: Comment;
  className?: string;
};

export function Comment({ comment, className }: CommentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className={cn("flex gap-x-2 items-start", className)}>
        <Link href={`/author/${comment.user.id}`}>
          <UserAvatar user={comment.user} />
        </Link>

        <div className="flex-1">
          <div className="flex gap-x-2 items-center mt-1">
            <Link href={`/author/${comment.user.id}`}>
              <span className="font-bold">{getUserName(comment.user)}</span>
            </Link>
            <span className="w-1 h-1 bg-[#505050] rounded-sm"></span>
            <span className="text-[10px] text-[#B0B0B0]">
              {formatStoryCreateAt(comment.createdAt)}
            </span>

            <MoreHorizontalIcon
              className="size-5 cursor-pointer ms-auto"
              onClick={() => setIsMenuOpen(true)}
            />
          </div>

          <p className="w-full text-sm text-[#B0B0B0] whitespace-pre-line line-clamp-6 leading-6 mt-1">
            {comment.text.trim()}
          </p>
        </div>
      </div>

      <CommentMenuSheet comment={comment} isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </>
  );
}

type CommentSkeletonProps = {
  className?: string;
};

export function CommentSkeleton({ className }: CommentSkeletonProps) {
  return (
    <div className={cn("flex gap-x-2", className)}>
      <div>
        <div className="size-7 bg-[#505050] opacity-40 rounded-lg animate-pulse"></div>
      </div>

      <div className="flex-1 mt-1">
        <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
        <div className="w-[50%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
      </div>
    </div>
  );
}

type CommentMenuSheetProps = {
  isOpen: boolean;
  comment: Comment;
  onOpenChange: (open: boolean) => void;
};

function CommentMenuSheet({ comment, isOpen, onOpenChange }: CommentMenuSheetProps) {
  const queryClient = useQueryClient();
  const isDeletePending = false;
  const [isEditCommentDialogOpen, setIsEditCommentDialogOpen] = useState(false);

  const onEdit = () => {
    setIsEditCommentDialogOpen(true);
  };

  const onEditSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [STORIES_QUERY_KEYS.GET_STORY_COMMENTS],
      exact: false,
    });

    setIsEditCommentDialogOpen(false);
  };

  const onDelete = () => {};

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader className="sr-only">
            <SheetTitle>نقد</SheetTitle>
            <SheetDescription>دسترسی‌های مربوط به نقد</SheetDescription>
          </SheetHeader>

          <ul className="divide-y divide-[#505050] px-5">
            {true && (
              <li
                className={cn("flex gap-x-2 items-center py-4 cursor-pointer", {
                  "opacity-50": isDeletePending,
                })}
                onClick={onEdit}
              >
                <EditIcon className="size-5" />
                <span className="mt-[2px]">ویرایش نقد</span>
              </li>
            )}

            {true && (
              <li
                className={cn("flex gap-x-2 items-center py-4 cursor-pointer", {
                  "opacity-50": isDeletePending,
                })}
                onClick={onDelete}
              >
                <TrashIcon className="size-5 text-[#C46B5A]" />
                <span className="text-[#C46B5A] mt-[6px]">حذف نقد</span>
              </li>
            )}
          </ul>
        </SheetContent>
      </Sheet>

      <EditCommentDialog
        comment={comment}
        open={isEditCommentDialogOpen}
        onOpenChange={setIsEditCommentDialogOpen}
        onSuccess={onEditSuccess}
      />
    </>
  );
}
