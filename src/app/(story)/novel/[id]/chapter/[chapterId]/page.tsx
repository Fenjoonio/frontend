"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/classnames";
import Reader from "@/components/ReaderNew";
import BackArrow from "@/components/BackArrow";
import { Button } from "@/components/ui/button";
import { useGetChapterById } from "@/services/novels";
import { notFound, useParams } from "next/navigation";

type ChapterSkeletonProps = {
  className?: string;
};

function ChapterSkeleton({ className }: ChapterSkeletonProps) {
  return (
    <div className={cn("p-5", className)}>
      <div className="w-[90%] h-5 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse"></div>
      <div className="w-[60%] h-5 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-3"></div>
      <div className="w-[100%] h-5 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-3"></div>
      <div className="w-[80%] h-5 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-3"></div>

      <div className="w-[40%] h-5 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-10"></div>
      <div className="w-[80%] h-5 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-3"></div>
      <div className="w-full h-5 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-3"></div>
      <div className="w-[30%] h-5 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-3"></div>
    </div>
  );
}

export default function NovelChapterPage() {
  const params = useParams<{ id: string; chapterId: string }>();
  const { data, isFetched } = useGetChapterById({ id: +params.id, chapterId: +params.chapterId });

  if (!data) {
    return (
      <>
        <header
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
          className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
        >
          <BackArrow />
          <div className="w-[40%] h-5 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse"></div>
        </header>

        <ChapterSkeleton />
      </>
    );
  }

  if (isFetched && !data) {
    notFound();
  }

  return (
    <section className="min-h-svh">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">{data?.chapter.title || ""}</h1>
      </header>

      <Reader initialState={data?.chapter.jsonContent || ""} className="py-4 px-5" />

      {data?.hasNext ? (
        <Link
          href={`/novel/${params.id}/chapter/${+params.chapterId + 1}`}
          replace
          className="block py-8 px-5"
        >
          <Button variant="outline" className="w-full">
            بخش بعدی
          </Button>
        </Link>
      ) : (
        <Link href={`/novel/${params.id}`} replace className="block py-8 px-5">
          <Button variant="outline" className="w-full">
            بازگشت به صفحه داستان
          </Button>
        </Link>
      )}
    </section>
  );
}
