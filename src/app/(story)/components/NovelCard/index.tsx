import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/classnames";
import { type Novel } from "@/services/novels";
import { getUserName } from "@/lib/utils/users";
import NovelDraftTooltip from "./components/NovelDraftTooltip";
import NoCoverImage from "../../../../../public/assets/images/no-image.png";

type NovelCardProps = {
  novel: Novel;
  className?: string;
};

export default function NovelCard({ novel, className }: NovelCardProps) {
  const url = novel.isPublished ? `/novel/${novel.id}` : `/novel/${novel.id}/info`;

  return (
    <div className={cn("flex gap-x-4", className)}>
      <Link
        href={url}
        title={novel.title || `داستان #${novel.id}`}
        className="shrink-0 w-24 h-36 relative overflow-hidden rounded-md"
      >
        <Image
          fill
          sizes="128px"
          alt={`تصویر ${novel.title}`}
          src={novel.coverImage || NoCoverImage}
          className="object-cover"
        />

        {!novel.isPublished && (
          <NovelDraftTooltip className="absolute bottom-2 end-2 z-10 size-4" />
        )}
      </Link>

      <div className="mt-1">
        <Link
          href={url}
          title={novel.title || `داستان #${novel.id}`}
          className="text-lg font-semibold line-clamp-2"
        >
          {novel.title || `داستان #${novel.id}`}
        </Link>

        <Link href={`/author/${novel.user.id}`} className="block text-sm text-soft-foreground mt-2">
          <span className="mt-1">{getUserName(novel.user)}</span>
        </Link>
      </div>
    </div>
  );
}

type NovelCardSkeletonProps = {
  className?: string;
};

export function NovelCardSkeleton({ className }: NovelCardSkeletonProps) {
  return (
    <div className={cn("flex gap-x-2", className)}>
      <div className="shrink-0 w-24 h-36 bg-gray-300 dark:bg-border opacity-40 rounded-lg animate-pulse"></div>

      <div className="flex-1 mt-1">
        <div className="w-full h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse"></div>
        <div className="w-[80%] h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-2"></div>
        <div className="w-20 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse mt-4"></div>
      </div>
    </div>
  );
}
