import Story from "./components/Story";
import BackArrow from "@/components/BackArrow";

type StoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;

  return (
    <section className="pb-20">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="flex items-end sticky top-0 z-10 bg-[#3a3a3a] pb-3 px-2"
      >
        <BackArrow />
      </header>

      <Story id={id} />

      <div className="py-10 px-4 border-t border-[#505050] mt-32">
        <h2 className="text-lg font-bold">نقدها</h2>
        <span className="text-sm text-[#B0B0B0]">این بخش بزودی اضافه خواهد شد ..</span>
      </div>
    </section>
  );
}
