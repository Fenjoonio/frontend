import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/classnames";
import type { Novel } from "@/services/novels";
import NoCoverImage from "../../../../public/assets/images/no-image.png";

type VerticalNovelCardProps = {
  novel: Novel;
  className?: string;
};

export default function VerticalNovelCard({ novel, className }: VerticalNovelCardProps) {
  return (
    <Link href={`/novel/${novel.id}`} className={cn("flex flex-col", className)}>
      <div className="shrink-0 min-w-24 h-36 relative overflow-hidden rounded-md">
        <Image
          fill
          sizes="96px"
          alt={novel.title}
          src={novel.coverImage || NoCoverImage}
          className="object-cover"
        />
      </div>

      <span title={novel.title} className="w-24 block text-sm text-soft-foreground text-nowrap truncate mt-2">{novel.title}</span>
    </Link>
  );
}
