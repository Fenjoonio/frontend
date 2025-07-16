"use client";

import { cn } from "@/lib/utils/classnames";
import { $isQuoteNode } from "@lexical/rich-text";
import { $findMatchingParent } from "@lexical/utils";
import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  type TextFormatType,
} from "lexical";
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
  TypeIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";

type EditorToolkitProps = {
  className?: string;
};

export default function EditorToolkit({ className }: EditorToolkitProps) {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<string>("right");

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text formatting states
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      // Check if we're in a quote
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && parent.getKey() === "root";
            });

      if (element) {
        setIsQuote($isQuoteNode(element));
      }
    }
  }, []);

  useEffect(() => {
    const unregisterCanUndo = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      1
    );

    const unregisterCanRedo = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      1
    );

    const unregisterSelectionChange = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      1
    );

    return () => {
      unregisterCanUndo();
      unregisterCanRedo();
      unregisterSelectionChange();
    };
  }, [editor, updateToolbar]);

  const format = (type: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  const handleAlignment = (alignment: "left" | "center" | "right" | "justify") => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
    setAlignment(alignment);
  };

  const handleUndo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const handleRedo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  return (
    <div className={cn("flex bg-soft-background rounded-lg", className)}>
      <div className="flex gap-x-1 items-center bg-background rounded-md my-1 ms-1">
        <div className={cn("p-2 cursor-pointer", { "text-primary bg-primary/10": isQuote })}>
          <QuoteIcon />
        </div>

        <Popover>
          <PopoverTrigger className="p-2 cursor-pointer hover:bg-gray-100 rounded">
            <TypeIcon />
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <div className="flex bg-background rounded-md">
              <button
                className={cn("p-2 cursor-pointer", { "text-primary bg-primary/10": isUnderline })}
                onClick={() => format("underline")}
              >
                <UnderlineIcon />
              </button>

              <button
                className={cn("p-2 cursor-pointer", { "text-primary bg-primary/10": isItalic })}
                onClick={() => format("italic")}
              >
                <ItalicIcon />
              </button>

              <button
                className={cn("p-2 cursor-pointer", { "text-primary bg-primary/10": isBold })}
                onClick={() => format("bold")}
              >
                <BoldIcon />
              </button>
            </div>

            <PopoverArrow className="mb-1" />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="p-2 cursor-pointer">
            <AlignJustifyIcon />
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <div className="flex bg-background rounded-md">
              <div
                className={cn("p-2 cursor-pointer", {
                  "text-primary bg-primary/10": alignment === "justify",
                })}
                onClick={() => handleAlignment("justify")}
              >
                <AlignJustifyIcon />
              </div>

              <div
                className={cn("p-2 cursor-pointer", {
                  "text-primary bg-primary/10": alignment === "right",
                })}
                onClick={() => handleAlignment("right")}
              >
                <AlignRightIcon />
              </div>

              <div
                className={cn("p-2 cursor-pointer", {
                  "text-primary bg-primary/10": alignment === "center",
                })}
                onClick={() => handleAlignment("center")}
              >
                <AlignCenterIcon />
              </div>

              <div
                className={cn("p-2 cursor-pointer", {
                  "text-primary bg-primary/10": alignment === "left",
                })}
                onClick={() => handleAlignment("left")}
              >
                <AlignLeftIcon />
              </div>
            </div>

            <PopoverArrow className="mb-1" />
          </PopoverContent>
        </Popover>

        <button
          disabled={!canRedo}
          className="p-2 cursor-pointer disabled:text-gray-300"
          onClick={handleRedo}
        >
          <RedoIcon />
        </button>

        <button
          disabled={!canUndo}
          className="p-2 cursor-pointer disabled:text-gray-300"
          onClick={handleUndo}
        >
          <UndoIcon />
        </button>
      </div>

      <div className="p-3">
        <MinusIcon />
      </div>
    </div>
  );
}
