"use client";

import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { $findMatchingParent } from "@lexical/utils";
import { useCallback, useEffect, useState } from "react";
import { $createQuoteNode, $isQuoteNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  $createParagraphNode,
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
  PlusIcon,
  QuoteIcon,
  RedoIcon,
  SaveIcon,
  TypeIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";

type ToolbarProps = {
  className?: string;
  isSaveLoading?: boolean;
  onSave: () => void;
};

export default function Toolbar({ isSaveLoading, className, onSave }: ToolbarProps) {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<string>("right");

  const Icon = isExpanded ? MinusIcon : PlusIcon;

  const updateToolbar = useCallback(() => {
    editor.read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        setIsBold(selection.hasFormat("bold"));
        setIsItalic(selection.hasFormat("italic"));
        setIsUnderline(selection.hasFormat("underline"));

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
        } else {
          setIsQuote(false);
        }
      }
    });
  }, [editor]);

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
    setTimeout(updateToolbar, 0);
  };

  const handleRedo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
    setTimeout(updateToolbar, 0);
  };

  const handleQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const anchorNode = selection.anchor.getNode();
      const topLevelElement = anchorNode.getTopLevelElementOrThrow();

      if ($isQuoteNode(topLevelElement)) {
        const paragraphNode = $createParagraphNode();
        const children = topLevelElement.getChildren();
        for (const child of children) {
          paragraphNode.append(child);
        }
        topLevelElement.replace(paragraphNode);
      } else {
        const quoteNode = $createQuoteNode();
        const children = topLevelElement.getChildren();
        for (const child of children) {
          quoteNode.append(child);
        }
        topLevelElement.replace(quoteNode);
      }

      updateToolbar();
    });
  };

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="flex bg-soft-background rounded-lg">
        {isExpanded && (
          <div className="flex gap-x-1 items-center bg-background rounded-md my-1 ms-1 overflow-hidden">
            <button
              tabIndex={3}
              className={cn("p-2 cursor-pointer", { "text-primary bg-primary/10": isQuote })}
              onClick={handleQuote}
            >
              <QuoteIcon />
            </button>

            <Popover>
              <PopoverTrigger tabIndex={4} className="p-2 cursor-pointer">
                <TypeIcon />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <div className="flex bg-background rounded-md">
                  <button
                    disabled
                    tabIndex={5}
                    className={cn("p-2 enabled:cursor-pointer disabled:opacity-25", {
                      "text-primary bg-primary/10": isUnderline,
                    })}
                    onClick={() => format("underline")}
                  >
                    <UnderlineIcon />
                  </button>

                  <button
                    tabIndex={6}
                    className={cn("p-2 cursor-pointer", { "text-primary bg-primary/10": isItalic })}
                    onClick={() => format("italic")}
                  >
                    <ItalicIcon />
                  </button>

                  <button
                    tabIndex={7}
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
              <PopoverTrigger tabIndex={8} className="p-2 cursor-pointer">
                <AlignJustifyIcon />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <div className="flex bg-background rounded-md">
                  <button
                    tabIndex={9}
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": alignment === "justify",
                    })}
                    onClick={() => handleAlignment("justify")}
                  >
                    <AlignJustifyIcon />
                  </button>

                  <button
                    tabIndex={10}
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": alignment === "right",
                    })}
                    onClick={() => handleAlignment("right")}
                  >
                    <AlignRightIcon />
                  </button>

                  <button
                    tabIndex={11}
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": alignment === "center",
                    })}
                    onClick={() => handleAlignment("center")}
                  >
                    <AlignCenterIcon />
                  </button>

                  <button
                    tabIndex={12}
                    className={cn("p-2 cursor-pointer", {
                      "text-primary bg-primary/10": alignment === "left",
                    })}
                    onClick={() => handleAlignment("left")}
                  >
                    <AlignLeftIcon />
                  </button>
                </div>

                <PopoverArrow className="mb-1" />
              </PopoverContent>
            </Popover>

            <button
              tabIndex={13}
              disabled={!canRedo}
              className="p-2 cursor-pointer disabled:text-gray-300"
              onClick={handleRedo}
            >
              <RedoIcon />
            </button>

            <button
              tabIndex={14}
              disabled={!canUndo}
              className="p-2 cursor-pointer disabled:text-gray-300"
              onClick={handleUndo}
            >
              <UndoIcon />
            </button>
          </div>
        )}

        <div className="p-3" onClick={() => setIsExpanded(!isExpanded)}>
          <Icon />
        </div>
      </div>

      <div className="flex fixed bottom-5 end-5 bg-primary rounded-lg">
        <Button disabled={isSaveLoading} tabIndex={15} size="sm" className="w-12" onClick={onSave}>
          <SaveIcon />
        </Button>
      </div>
    </div>
  );
}
