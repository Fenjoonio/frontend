import { getUserName } from "@/lib/utils/users";
import { getSingleStory } from "@/services/stories";
import { notFound } from "next/navigation";

type StoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const { story } = await getSingleStory({ id: +id });

  if (!story) {
    notFound();
  }

  return (
    <section>
      <div key={story.id} className="w-full py-8 px-4 not-first:border-t border-[#505050]">
        <span className="block font-bold">{getUserName(story.user)}</span>
        <p className="w-full text-[#B0B0B0] mt-2">{story.text}</p>
      </div>
    </section>
  );
}
