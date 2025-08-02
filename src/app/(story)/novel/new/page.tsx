"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/components/EditorNew";
import { Input } from "@/components/ui/input";
import BackArrow from "@/components/BackArrow";
import { useCreateNewNovel } from "@/services/novels";

export default function NewNovelPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { mutate: createNewNovel, isPending } = useCreateNewNovel({
    onSuccess: (novel) => {
      router.replace(`/novel/${novel.id}/info`);
    },
  });

  const save = (novel: { json: any; text: string }) => {
    createNewNovel({
      title: "",
      description: "",
      chapters: [{ title, text: novel.text, jsonContent: JSON.stringify(novel.json) }],
    });
  };

  return (
    <section className="min-h-svh">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">داستان جدید</h1>
      </header>

      <article className="p-5">
        <Input
          value={title}
          disabled={isPending}
          placeholder="عنوان بخش اول"
          className="border-none shadow-none !text-xl placeholder:text-gray-300 placeholder:text-xl font-bold p-0"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor className="mt-5" isSaveLoading={isPending} onSave={save} />
      </article>
    </section>
  );
}
