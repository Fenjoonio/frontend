"use client";

import Editor from "@/components/EditorNew";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import BackArrow from "@/components/BackArrow";
import { useParams, useRouter } from "next/navigation";
import { useEditChapter, useGetChapterById } from "@/services/novels";

export default function EditChapterPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  const { data } = useGetChapterById({ id: +id, chapterId: +chapterId });
  const { mutate: editChapter, isPending } = useEditChapter(
    { id: +id, chapterId: +chapterId },
    {
      onSuccess: () => {
        router.replace(`/novel/${id}/info`, { scroll: false });
      },
    }
  );

  useEffect(() => {
    if (!data?.chapter?.title) return;

    setTitle(data.chapter.title);
  }, [data?.chapter.title]);

  const save = (chapter: { json: any; text: string }) => {
    editChapter({
      title,
      id: +id,
      text: chapter.text,
      chapterId: +chapterId,
      jsonContent: JSON.stringify(chapter.json),
    });
  };

  return (
    <section className="min-h-svh">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">ویرایش این بخش</h1>
      </header>

      <article className="p-5">
        <Input
          value={title}
          disabled={isPending}
          placeholder="عنوان این بخش"
          className="border-none shadow-none !text-xl placeholder:text-gray-300 placeholder:text-xl font-bold p-0"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor
          className="mt-5"
          initialState={data?.chapter.jsonContent}
          isSaveLoading={isPending}
          onSave={save}
        />
      </article>
    </section>
  );
}
