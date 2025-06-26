"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type ViewerProps = {
  content: any;
  className?: string;
};

export default function Viewer({ content, className }: ViewerProps) {
  return <Editor data={content} className={className} />;
}
