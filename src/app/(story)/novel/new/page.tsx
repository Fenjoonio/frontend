"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import BackArrow from "@/components/BackArrow";

const Editor = dynamic(() => import("./components/Editor"), { ssr: false });

export default function NewNovelPage() {
  const [title, setTitle] = useState("");

  const save = (novel: { json: any; text: string }) => {
    console.log("novel", novel);
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
          placeholder="عنوان این بخش"
          className="border-none shadow-none !text-xl placeholder:text-gray-300 placeholder:text-xl font-bold p-0"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor className="mt-5" onSave={save} />
      </article>
    </section>
  );
}
