import Editor from "@/components/EditorNew";

type ReaderProps = {
  className?: string
  initialState: string;
};

export default function Reader({ initialState, className }: ReaderProps) {
  return <Editor initialState={initialState} className={className} readOnly />;
}
