"use client";

import "./editor-overrides.css";
import { useCallback } from "react";
import Toolbar from "./components/Toolbar";
import { cn } from "@/lib/utils/classnames";
import StarterKit from "@tiptap/starter-kit";
import SelectAll from "./extensions/SelectAll";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import useKeyboardHeight from "@/hooks/useKeyboardHeigh";

type EditorProps = {
  readOnly?: boolean;
  className?: string;
  initialState?: string;
  isSaveLoading?: boolean;
  onSave?: (data: { json: any; text: string }) => void;
};

export default function Editor({
  readOnly,
  initialState,
  isSaveLoading,
  className,
  onSave,
}: EditorProps) {
  const keyboardHeight = useKeyboardHeight();

  const editor = useEditor({
    autofocus: "end",
    editable: !readOnly,
    immediatelyRender: false,
    content: initialState ? JSON.parse(initialState) : "",
    extensions: [
      SelectAll,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Placeholder.configure({
        placeholder: "داستان از اینجا شروع میشه که ...",
        showOnlyCurrent: true,
        includeChildren: false,
      }),
    ],
    onUpdate: () => {
      setTimeout(scrollToCursor, 10);
    },
  });

  const scrollToCursor = useCallback(() => {
    if (!editor || editor.isDestroyed) return;

    try {
      const { state } = editor;
      const { selection } = state;
      const { from } = selection;

      const node = editor.view.domAtPos(from).node;

      let targetElement: Element | null = null;

      if (node.nodeType === Node.TEXT_NODE) {
        targetElement = node.parentElement;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        targetElement = node as Element;
      }

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const keyboardOffset = Math.abs(keyboardHeight);
        const availableHeight = viewportHeight - keyboardOffset;

        if (rect.bottom > availableHeight - 100) {
          const scrollOffset = rect.bottom - availableHeight + 150;
          window.scrollBy({ top: scrollOffset, behavior: "smooth" });
        }
      }
    } catch (error) {
      console.warn("Error scrolling to cursor:", error);
    }
  }, [editor, keyboardHeight]);

  const handleSave = useCallback(() => {
    if (!editor || !onSave) return;
    const json = editor.getJSON();
    const text = editor.getText();
    onSave({ json, text });
  }, [editor, onSave]);

  if (!editor) {
    return <EditorSkeleton className={className} />;
  }

  return (
    <div className={cn("editor relative", className)}>
      {!readOnly && (
        <div onMouseDown={(e) => e.preventDefault()}>
          <Toolbar
            editor={editor}
            isSaveLoading={isSaveLoading}
            className="w-full fixed z-10 bottom-5 start-0 px-5 transition-transform will-change-transform select-none"
            style={{ transform: `translateY(${keyboardHeight}px)` }}
            onSave={handleSave}
          />
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}

type EditorSkeletonProps = {
  className?: string;
};

function EditorSkeleton({ className }: EditorSkeletonProps) {
  return (
    <div className={className}>
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
