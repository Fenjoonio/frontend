"use client";

import "./styles/editor-overrides.css";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils/classnames";
import EditorToolkit from "../EditorToolkit";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LexicalComposer, type InitialConfigType } from "@lexical/react/LexicalComposer";

type EditorProps = PropsWithChildren<{
  className?: string;
  enableToolkit?: boolean;
  toolkitClassName?: string;
}>;

function Placeholder() {
  return (
    <div className="absolute top-0 start-0 text-gray-300 pointer-events-none">
      مثلاً: کاش توی خیابون، بارون می‌اومد و کسی منتظر کسی نبود...
    </div>
  );
}

export default function Editor({ enableToolkit = true, toolkitClassName, className }: EditorProps) {
  const editorConfig: InitialConfigType = {
    namespace: "FenjoonEditor",
    nodes: [HeadingNode, QuoteNode],
    theme: {
      quote: "border-s-2 py-2 px-2 border-primary italic text-muted-foreground",
    },
    onError(error) {
      console.error("Lexical error:", error);
    },
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={cn("relative", className)}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-96 outline-none" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
      {enableToolkit && <EditorToolkit className={toolkitClassName} />}
    </LexicalComposer>
  );
}
