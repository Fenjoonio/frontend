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
  });

  const handleSave = useCallback(() => {
    if (!editor || !onSave) return;
    const json = editor.getJSON();
    const text = editor.getText();
    onSave({ json, text });
  }, [editor, onSave]);

  if (!editor) return null;

  return (
    <div className={cn("editor relative h-[20%]", className)}>
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