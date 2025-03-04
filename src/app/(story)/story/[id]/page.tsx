import Story from "./components/Story";
import BackArrow from "@/components/BackArrow";
import MenuSheet from "./components/MenuSheet";
import InfiniteCommentsList from "./components/InfiniteCommentsList";

type StoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;

  return (
    <section className="min-h-svh pb-20">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="flex items-end justify-between sticky top-0 z-10 pb-3 px-2"
      >
        <BackArrow />

        <MenuSheet
          storyId={id}
          className="w-10 h-10 flex items-center justify-center cursor-pointer"
        />
      </header>

      <div className="min-h-[256px]">
        <Story id={id} />
      </div>

      <div className="py-8 mx-5 border-t border-[#505050] mt-8">
        <InfiniteCommentsList id={id} />
      </div>
    </section>
  );
}
