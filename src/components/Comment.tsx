"use client";

import Link from "next/link";
import { useState } from "react";
import UserAvatar from "./UserAvatar";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils/classnames";
import { getUserName } from "@/lib/utils/users";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { useDeleteComment, type Comment } from "@/services/comments";
import EditCommentDialog from "@/app/(comment)/components/EditCommentDialog";
import CommentLikeButton from "@/app/(comment)/components/CommentLikeButton";
import { EditIcon, FlagIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";

type CommentProps = {
  comment: Comment;
  className?: string;
  onCommentEdit?: VoidFunction;
  onCommentDelete?: VoidFunction;
};

export function Comment({ comment, className, onCommentEdit, onCommentDelete }: CommentProps) {
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
            <span className="size-1 bg-gray-300 dark:bg-border rounded-sm"></span>
            <span className="text-[10px] text-light-gray-900 dark:text-soft-foreground">
              {formatStoryCreateAt(comment.createdAt)}
            </span>

            <MoreHorizontalIcon
              className="size-5 cursor-pointer ms-auto"
              onClick={() => setIsMenuOpen(true)}
            />
          </div>

          <p className="w-full text-sm text-soft-foreground whitespace-pre-line line-clamp-6 leading-6 mt-1">
            {comment.text.trim()}
          </p>

          <div className="flex items-center gap-x-4 mt-4">
            <CommentLikeButton
              commentId={comment.id}
              likesCount={comment.likesCount}
              isLikedByUser={comment.isLikedByUser}
              className="w-5 h-5 text-soft-foreground"
            />
          </div>
        </div>
      </div>

      <CommentMenuSheet
        comment={comment}
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        onCommentEdit={onCommentEdit}
        onCommentDelete={onCommentDelete}
      />
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
        <div className="size-7 bg-border opacity-40 rounded-lg animate-pulse"></div>
      </div>

      <div className="flex-1 mt-1">
        <div className="w-20 h-4 bg-border opacity-40 rounded-full animate-pulse"></div>
        <div className="w-[50%] h-4 bg-border opacity-20 rounded-full animate-pulse mt-4"></div>
      </div>
    </div>
  );
}

type CommentMenuSheetProps = {
  isOpen: boolean;
  comment: Comment;
  onCommentEdit?: VoidFunction;
  onCommentDelete?: VoidFunction;
  onOpenChange: (open: boolean) => void;
};

function CommentMenuSheet({
  comment,
  isOpen,
  onOpenChange,
  onCommentEdit,
  onCommentDelete,
}: CommentMenuSheetProps) {
  const [isEditCommentDialogOpen, setIsEditCommentDialogOpen] = useState(false);
  const { mutate: deleteComment, isPending: isDeletePending } = useDeleteComment({
    onSuccess: onCommentDelete,
  });

  const onEdit = () => {
    if (isDeletePending) return;
    setIsEditCommentDialogOpen(true);
  };

  const onEditSuccess = () => {
    onCommentEdit?.();
    setIsEditCommentDialogOpen(false);
  };

  const onDelete = () => {
    if (isDeletePending) return;
    deleteComment({ id: comment.id });
  };

  const onReport = () => {
    toast.info("این قابلیت بزودی اضافه می‌شود.");
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader className="sr-only">
            <SheetTitle>نقد</SheetTitle>
            <SheetDescription>دسترسی‌های مربوط به نقد</SheetDescription>
          </SheetHeader>

          <ul className="divide-y divide-border px-5">
            <li className="flex gap-x-2 items-center py-4 cursor-pointer" onClick={onReport}>
              <FlagIcon className="size-5" />
              <span className="mt-1">گزارش نقد</span>
            </li>

            {comment.isEditableByUser && (
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

            {comment.isDeletableByUser && (
              <li
                className={cn("flex gap-x-2 items-center py-4 cursor-pointer", {
                  "opacity-50": isDeletePending,
                })}
                onClick={onDelete}
              >
                <TrashIcon className="size-5 text-danger" />
                <span className="text-danger mt-[6px]">حذف نقد</span>
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
