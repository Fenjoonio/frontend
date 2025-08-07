"use client";

import { useState } from "react";
import Editor from "@/components/EditorNew";
import { Input } from "@/components/ui/input";
import BackArrow from "@/components/BackArrow";
import { useParams, useRouter } from "next/navigation";
import { useCreateNewChapter } from "@/services/novels";

export default function NewChapterPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { id } = useParams<{ id: string }>();
  const { mutate: createNewChapter, isPending } = useCreateNewChapter(
    { id: +id },
    {
      onSuccess: () => {
        router.replace(`/novel/${id}/info`);
      },
    }
  );

  const save = (chapter: { json: any; text: string }) => {
    createNewChapter({
      id: +id,
      title,
      text: chapter.text,
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
        <h1 className="text-lg font-bold mt-1">افزودن بخش جدید</h1>
      </header>

      <article className="p-5">
        <Input
          value={title}
          disabled={isPending}
          placeholder="عنوان این بخش"
          className="border-none shadow-none !text-xl placeholder:text-gray-300 placeholder:text-xl font-bold p-0"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor className="mt-5" isSaveLoading={isPending} onSave={save} />
      </article>
    </section>
  );
}
