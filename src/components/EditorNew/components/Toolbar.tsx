"use client";

import type { Editor } from "@tiptap/react";
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
import { useState, useEffect, CSSProperties } from "react";

type ToolbarProps = {
  className?: string;
  editor: Editor | null;
  style?: CSSProperties;
  isSaveLoading?: boolean;
  onSave: () => void;
};

export default function Toolbar({ isSaveLoading, style, className, onSave, editor }: ToolbarProps) {
  const [, forceUpdate] = useState({}); // trigger re-render
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTypePopoverOpen, setIsTypePopoverOpen] = useState(false);
  const [isAlignmentPopoverOpen, setIsAlignmentPopoverOpen] = useState(false);

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
    <div style={style} className={cn("flex justify-between items-center", className)}>
      <div className="flex bg-soft-background rounded-lg">
        {isExpanded && (
          <div className="flex gap-x-1 items-center bg-background rounded-md my-1 ms-1 overflow-hidden">
            <button
              className={cn("p-2 cursor-pointer", {
                "text-primary bg-primary/10": isActive("blockquote"),
              })}
              onClick={() => editor.chain().toggleBlockquote().run()}
            >
              <QuoteIcon />
            </button>

            <Popover open={isTypePopoverOpen} onOpenChange={setIsTypePopoverOpen}>
              <PopoverTrigger className="p-2 cursor-pointer">
                <TypeIcon />
              </PopoverTrigger>

              <PopoverContent
                side="top"
                className="p-1"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <div className="flex bg-background rounded-md">
                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive("underline"),
                    })}
                    onClick={() => {
                      setIsTypePopoverOpen(false);
                      editor.chain().toggleUnderline().run();
                    }}
                  >
                    <UnderlineIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive("italic"),
                    })}
                    onClick={() => {
                      setIsTypePopoverOpen(false);
                      editor.chain().toggleItalic().run();
                    }}
                  >
                    <ItalicIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive("bold"),
                    })}
                    onClick={() => {
                      setIsTypePopoverOpen(false);
                      editor.chain().toggleBold().run();
                    }}
                  >
                    <BoldIcon />
                  </button>
                </div>
                <PopoverArrow className="mb-1" />
              </PopoverContent>
            </Popover>

            <Popover open={isAlignmentPopoverOpen} onOpenChange={setIsAlignmentPopoverOpen}>
              <PopoverTrigger className="p-2 cursor-pointer">
                <AlignJustifyIcon />
              </PopoverTrigger>

              <PopoverContent
                side="top"
                className="p-1"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <div className="flex bg-background rounded-md">
                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive({ textAlign: "justify" }),
                    })}
                    onClick={() => {
                      setIsAlignmentPopoverOpen(false);
                      editor.chain().setTextAlign("justify").run();
                    }}
                  >
                    <AlignJustifyIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive({ textAlign: "right" }),
                    })}
                    onClick={() => {
                      setIsAlignmentPopoverOpen(false);
                      editor.chain().setTextAlign("right").run();
                    }}
                  >
                    <AlignRightIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive({ textAlign: "center" }),
                    })}
                    onClick={() => {
                      setIsAlignmentPopoverOpen(false);
                      editor.chain().setTextAlign("center").run();
                    }}
                  >
                    <AlignCenterIcon />
                  </button>

                  <button
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": isActive({ textAlign: "left" }),
                    })}
                    onClick={() => {
                      setIsAlignmentPopoverOpen(false);
                      editor.chain().setTextAlign("left").run();
                    }}
                  >
                    <AlignLeftIcon />
                  </button>
                </div>
                <PopoverArrow className="mb-1" />
              </PopoverContent>
            </Popover>

            <button
              className="p-2 cursor-pointer disabled:text-gray-300"
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().redo().run()}
            >
              <RedoIcon />
            </button>

            <button
              className="p-2 cursor-pointer disabled:text-gray-300"
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().undo().run()}
            >
              <UndoIcon />
            </button>
          </div>
        )}

        <div className="p-3" onClick={() => setIsExpanded(!isExpanded)}>
          <Icon />
        </div>
      </div>

      <div className="bg-primary rounded-lg">
        <Button disabled={isSaveLoading} size="sm" className="w-12" onClick={onSave}>
          <SaveIcon />
        </Button>
      </div>
    </div>
  );
}
