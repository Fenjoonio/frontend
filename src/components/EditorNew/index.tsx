"use client";

import { EditorState } from "lexical";
import Toolbar from "./components/Toolbar";
import { cn } from "@/lib/utils/classnames";
import { useState, useCallback } from "react";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import FlexibleContainer from "@/components/FlexibleContainer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalComposer, type InitialConfigType } from "@lexical/react/LexicalComposer";

function Placeholder() {
  return (
    <div className="absolute top-0 start-0 text-lg text-gray-300 pointer-events-none">
      داستان از اینجا شروع میشه که ...
    </div>
  );
}

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
  const [editorState, setEditorState] = useState<EditorState | null>(null);

  const onChange = useCallback((editorState: EditorState) => {
    setEditorState(editorState);
  }, []);

  const config: InitialConfigType = {
    editable: !readOnly,
    namespace: "FenjoonEditor",
    editorState: initialState ?? undefined,
    nodes: [HeadingNode, QuoteNode],
    theme: {
      paragraph: "text-lg leading-8",
      quote: "border-s-2 py-2 px-2 border-primary italic text-muted-foreground",
    },
    onError(error) {
      console.error("Lexical error", error);
    },
  };

  const handleSave = useCallback(() => {
    if (!editorState || !onSave) return;

    editorState.read(() => {
      const root = editorState._nodeMap.get("root");

      const text = root?.getTextContent() || "";
      const json = editorState.toJSON();

      onSave({ json, text });
    });
  }, [editorState, onSave]);

  return (
    <LexicalComposer initialConfig={config}>
      <div className={cn("editor relative", className)}>
        {!readOnly && (
          <Toolbar
            isSaveLoading={isSaveLoading}
            className="fixed z-10 bottom-5 start-5"
            onSave={handleSave}
          />
        )}

        <FlexibleContainer className="pb-16">
          <RichTextPlugin
            contentEditable={<ContentEditable className="min-h-96 outline-none" />}
            placeholder={<Placeholder />}
            ErrorBoundary={({ children }) => children}
          />
        </FlexibleContainer>

        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  );
}
