import { Tooltip } from "react-tooltip";
import { NotebookPenIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";

type NovelDraftTooltipProps = {
  className?: string;
};

export default function NovelDraftTooltip({ className }: NovelDraftTooltipProps) {
  return (
    <>
      <NotebookPenIcon data-tooltip-id="draft-tooltip" data-tooltip-position-strategy="fixed" className={cn("text-light-gray-100 outline-none", className)} />

      <Tooltip
        style={{ fontSize: "12px", borderRadius: "8px", zIndex: 100 }}
        id="draft-tooltip"
        content="پیش نویس"
      />
    </>
  );
}
