import Link from "next/link";
import { notFound } from "next/navigation";
import Viewer from "./components/NovelViewer";
import { Button } from "@/components/ui/button";
import { getNovelChapters } from "@/services/novels";

type NovelChapterPageProps = {
  params: Promise<{ id: string; chapterId: string }>;
};

export default async function NovelChapterPage({ params }: NovelChapterPageProps) {
  const { id, chapterId } = await params;

  const chapters = await getNovelChapters({ id: Number(id) });

  const chapterContent = chapters[+chapterId]?.content;
  const hasNextChapter = !!chapters[+chapterId + 1]?.content;

  if (!id || !chapterId || Number.isNaN(chapterId) || !chapterContent) {
    notFound();
  }

  return (
    <section className="min-h-svh">
      <Viewer content={chapterContent} className="py-4 px-5" />

      {hasNextChapter ? (
        <Link href={`/novel/${id}/chapter/${+chapterId + 1}`} className="block py-8 px-5">
          <Button variant="outline" className="w-full">
            بخش بعدی
          </Button>
        </Link>
      ) : (
        <Link href={`/novel/${id}`} className="block py-8 px-5">
          <Button variant="outline" className="w-full">
            بازگشت به صفحه داستان
          </Button>
        </Link>
      )}
    </section>
  );
}
