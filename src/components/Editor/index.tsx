"use client";

import "./styles/editor-overrides.css";
import { useEffect, useRef } from "react";
import { Paragraph, Header } from "./blocks";
import EditorJS, { type OutputData } from "@editorjs/editorjs";

type ReaderProps = {
  data: OutputData;
  className?: string;
};

export default function Editor({ data, className }: ReaderProps) {
  const editorRef = useRef(null);
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        readOnly: true,
        holder: editorRef.current,
        data: data,
        tools: {
          header: Header,
          paragraph: Paragraph,
        },
      });
    }

    return () => {
      if (!editorInstance.current?.destroy) return;

      editorInstance.current.destroy();
      editorInstance.current = null;
    };
  }, [data]);

  return <article ref={editorRef} className={className} />;
}
