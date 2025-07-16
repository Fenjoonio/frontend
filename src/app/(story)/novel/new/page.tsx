"use client";

import dynamic from "next/dynamic";
import { SaveIcon } from "lucide-react";
import { type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import BackArrow from "@/components/BackArrow";
import { Button } from "@/components/ui/button";

const Editor = dynamic(() => import("./components/Editor"), { ssr: false });

export default function NewNovelPage() {
  const onTitleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      // console.log("e.code");
    }
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
          placeholder="عنوان این بخش"
          className="border-none shadow-none !text-xl placeholder:text-gray-300 placeholder:text-xl font-bold p-0"
          onKeyDown={onTitleEnter}
        />

        <Editor className="mt-5" toolkitClassName="fixed bottom-5 start-5" />

        <div className="flex fixed bottom-5 end-5 bg-primary rounded-lg">
          <Button size="sm" className="w-12">
            <SaveIcon />
          </Button>
        </div>
      </article>
    </section>
  );
}
