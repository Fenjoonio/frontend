"use client";

import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from "@/components/ui/popover";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  QuoteIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  RedoIcon,
  UndoIcon,
  SaveIcon,
  PlusIcon,
  MinusIcon,
  TypeIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";

type ToolbarProps = {
  className?: string;
  isSaveLoading?: boolean;
  onSave: () => void;
  editor: Editor | null;
};

export default function Toolbar({ isSaveLoading, className, onSave, editor }: ToolbarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [, forceUpdate] = useState({}); // trigger re-render

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => forceUpdate({});
    editor.on("transaction", handleUpdate);
    editor.on("selectionUpdate", handleUpdate);

    return () => {
      editor.off("transaction", handleUpdate);
      editor.off("selectionUpdate", handleUpdate);
    };
  }, [editor]);

  if (!editor) return null;

  const Icon = isExpanded ? MinusIcon : PlusIcon;

  const isActive = (format: string | { [key: string]: any }) => editor.isActive(format);

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="flex bg-soft-background rounded-lg">
        {isExpanded && (
          <div className="flex gap-x-1 items-center bg-background rounded-md my-1 ms-1 overflow-hidden">
            {/* Quote */}
            <button
              className={cn("p-2 cursor-pointer", {
                "text-primary bg-primary/10": isActive("blockquote"),
              })}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <QuoteIcon />
            </button>

            {/* Text formats */}
            <Popover>
              <PopoverTrigger className="p-2 cursor-pointer">
                <TypeIcon />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <div className="flex bg-background rounded-md">
                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive("underline"),
                    })}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                  >
                    <UnderlineIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive("italic"),
                    })}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                  >
                    <ItalicIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive("bold"),
                    })}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                  >
                    <BoldIcon />
                  </button>
                </div>
                <PopoverArrow className="mb-1" />
              </PopoverContent>
            </Popover>

            {/* Alignment */}
            <Popover>
              <PopoverTrigger className="p-2 cursor-pointer">
                <AlignJustifyIcon />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <div className="flex bg-background rounded-md">
                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive({ textAlign: "justify" }),
                    })}
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                  >
                    <AlignJustifyIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive({ textAlign: "right" }),
                    })}
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                  >
                    <AlignRightIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive({ textAlign: "center" }),
                    })}
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                  >
                    <AlignCenterIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive({ textAlign: "left" }),
                    })}
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                  >
                    <AlignLeftIcon />
                  </button>
                </div>
                <PopoverArrow className="mb-1" />
              </PopoverContent>
            </Popover>

            {/* Redo / Undo */}
            <button
              className="p-2 cursor-pointer disabled:text-gray-300"
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            >
              <RedoIcon />
            </button>

            <button
              className="p-2 cursor-pointer disabled:text-gray-300"
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <UndoIcon />
            </button>
          </div>
        )}

        {/* Expand / Collapse */}
        <div className="p-3" onClick={() => setIsExpanded(!isExpanded)}>
          <Icon />
        </div>
      </div>

      {/* Save button */}
      <div className="flex fixed bottom-5 end-5 bg-primary rounded-lg">
        <Button disabled={isSaveLoading} size="sm" className="w-12" onClick={onSave}>
          <SaveIcon />
        </Button>
      </div>
    </div>
  );
}
