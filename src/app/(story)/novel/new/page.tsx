"use client";

import Editor from "./components/Editor";
import { Input } from "@/components/ui/input";
import BackArrow from "@/components/BackArrow";
import { type KeyboardEvent, useRef } from "react";
import { type Editor as TipTapEditor } from "@tiptap/core";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  MinusIcon,
  QuoteIcon,
  RedoIcon,
  SaveIcon,
  TypeIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function NewNovelPage() {
  const editorRef = useRef<TipTapEditor | null>(null);

  const onTitleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      console.log("e.code");
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
          className="border-none !text-xl placeholder:text-gray-300 placeholder:text-xl font-bold p-0"
          onKeyDown={onTitleEnter}
        />

        <Editor className="pt-5" onEditorCreate={(editor) => (editorRef.current = editor)} />

        <div className="flex fixed bottom-5 start-5 bg-soft-background rounded-lg">
          <div className="flex gap-x-1 items-center bg-background rounded-md my-1 ms-1">
            <div className="p-2">
              <QuoteIcon />
            </div>

            <Popover>
              <PopoverTrigger className="p-2">
                <TypeIcon />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <div className="flex bg-background rounded-md">
                  <div className="p-2">
                    <UnderlineIcon />
                  </div>

                  <div className="p-2">
                    <ItalicIcon />
                  </div>

                  <div className="p-2">
                    <BoldIcon />
                  </div>
                </div>

                <PopoverArrow className="mb-1" />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger className="p-2">
                <AlignJustifyIcon />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <div className="flex bg-background rounded-md">
                  <div className="p-2">
                    <AlignJustifyIcon />
                  </div>

                  <div className="p-2">
                    <AlignRightIcon />
                  </div>

                  <div className="p-2">
                    <AlignCenterIcon />
                  </div>

                  <div className="p-2">
                    <AlignLeftIcon />
                  </div>
                </div>

                <PopoverArrow className="mb-1" />
              </PopoverContent>
            </Popover>

            <div className="p-2">
              <RedoIcon />
            </div>

            <div className="p-2">
              <UndoIcon />
            </div>
          </div>

          <div className="p-3">
            <MinusIcon />
          </div>
        </div>

        <div className="flex fixed bottom-5 end-5 bg-primary rounded-lg">
          <div className="p-3">
            <SaveIcon />
          </div>
        </div>
      </article>
    </section>
  );
}
