import Story from "./components/Story";
import BackArrow from "@/components/BackArrow";
import MenuSheet from "./components/MenuSheet";

type StoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;

  return (
    <section className="pb-20">
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

      <Story id={id} />

      <div className="py-10 px-4 border-t border-[#505050] mt-32">
        <h2 className="text-lg font-bold">نقدها</h2>
        <span className="text-sm text-[#B0B0B0]">این بخش بزودی اضافه خواهد شد ..</span>
      </div>
    </section>
  );
}
