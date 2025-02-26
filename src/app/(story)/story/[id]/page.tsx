import Story from "./components/Story";

type StoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;

  return (
    <section>
      <Story id={id} />
    </section>
  );
}
