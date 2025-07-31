import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import MenuSheet from "./components/MenuSheet";
import BackArrow from "@/components/BackArrow";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { getNovelById } from "@/services/novels";
import NovelChapters from "./components/NovelChapters";

type NovelPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NovelPage({ params }: NovelPageProps) {
  const { id } = await params;
  const novel = await getNovelById({ id: Number(id) });

  if (!novel) {
    return notFound();
  }

  return (
    <section className="min-h-svh pb-20">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">{novel.title}</h1>

        <MenuSheet className="w-10 h-10 flex items-center justify-center cursor-pointer ms-auto" />
      </header>

      <div className="px-5 mt-4">
        <div className="flex gap-x-4">
          <div className="shrink-0 w-28 h-44 relative overflow-hidden rounded-lg">
            <Image src={novel.coverImage} alt={novel.title} fill className="object-cover" />
          </div>

          <div className="mt-2">
            <h1 className="text-xl font-bold">{novel.title}</h1>
            <Link
              href={`/author/${novel.user.id}`}
              className="flex gap-x-2 items-center text-sm text-soft-foreground mt-3"
            >
              <UserAvatar user={novel.user} className="size-6 rounded-sm" />
              <span className="mt-1">{getUserName(novel.user)}</span>
            </Link>
          </div>
        </div>

        <h3 className="text-sm text-soft-foreground mt-8">خلاصه داستان</h3>

        <p className="whitespace-pre-line line-clamp-6 leading-6 mt-2">{novel.description}</p>

        <h3 className="text-sm text-soft-foreground mt-8">آخرین بخش‌ها</h3>

        <NovelChapters chapters={novel.chapters} />
      </div>

      <div
        style={{ bottom: "env(safe-area-inset-bottom)" }}
        className="max-w-[480px] fixed bottom-0 right-0 left-0 mx-auto bg-background"
      >
        <Link href={`/novel/${novel.id}/chapter/${novel.chapters[0].id}`}>
          <Button className="w-full rounded-none">شروع خواندن</Button>
        </Link>
      </div>
    </section>
  );
}
