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
    <div className={cn("editor relative", className)}>
      {!readOnly && (
        <Toolbar
          editor={editor}
          isSaveLoading={isSaveLoading}
          className="fixed z-10 bottom-5 start-5"
          onSave={handleSave}
        />
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
