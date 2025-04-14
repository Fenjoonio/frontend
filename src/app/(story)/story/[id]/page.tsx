import Story from "./components/Story";
import BackArrow from "@/components/BackArrow";
import MenuSheet from "./components/MenuSheet";
import AuthorOtherStories from "./components/AuthorOtherStories";
import InfiniteCommentsList from "./components/InfiniteCommentsList";

type StoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;

  return (
    <section className="min-h-svh">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="flex items-end justify-between bg-background/40 backdrop-blur-xs sticky top-0 z-10 pb-3 px-2"
      >
        <BackArrow />

        <MenuSheet
          storyId={+id}
          className="w-10 h-10 flex items-center justify-center cursor-pointer"
        />
      </header>

      <Story id={id} />

      <AuthorOtherStories storyId={+id} className="mt-6" />

      <div id="comments">
        <InfiniteCommentsList id={id} className="mx-5 mt-8" />
      </div>
    </section>
  );
}
