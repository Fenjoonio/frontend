"use client";

import Link from "next/link";
import { useState } from "react";
import { Chapter } from "@/services/novels";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type NovelChaptersProps = {
  chapters: Chapter[];
  className?: string;
};

export default function NovelChapters({ chapters }: NovelChaptersProps) {
  const params = useParams<{ id: string }>();
  const [isShowingAllChapters, setIsShowingAllChapters] = useState(false);

  const novelChapters = isShowingAllChapters ? chapters : chapters.slice(0, 3);

  return (
    <div className="space-y-2 mt-2">
      {novelChapters.map((chapter, index) => (
        <Link
          key={chapter.id}
          href={`/novel/${params.id}/chapter/${chapter.id}/edit`}
          className="flex gap-x-12 items-center bg-soft-background py-4 px-4 rounded-sm"
        >
          <span className="truncate">{chapter.title}</span>
          <span className="text-xl text-soft-foreground font-bold ms-auto">{index + 1}</span>
        </Link>
      ))}

      {!isShowingAllChapters && chapters.length > 3 && (
        <Button variant="link" className="w-full" onClick={() => setIsShowingAllChapters(true)}>
          نمایش تمام بخش‌ها
        </Button>
      )}

      <Link href={`/novel/${params.id}/chapter/new`} className="block mt-4">
        <Button size="sm" variant="outline" className="w-full">
          افزودن بخش جدید
        </Button>
      </Link>
    </div>
  );
}
