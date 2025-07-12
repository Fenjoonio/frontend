import Link from "next/link";
import Image from "next/image";
import { getNovels } from "@/services/novels";
import BackArrow from "@/components/BackArrow";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";

export default async function LibraryPage() {
  const { novels } = await getNovels({ limit: 20 });
  const reversedNovels = novels.toReversed();

  return (
    <section className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">کتابخانه</h1>
      </header>

      <div className="px-5 mt-4">
        <span className="block text-sm text-soft-foreground mt-1">
          فرقی نداره داستان کوتاه دوست داری یا بلند، اینجا همه جورش رو پیدا می‌کنی!
        </span>
      </div>

      <div className="flex gap-4 flex-wrap px-5 mt-5">
        {reversedNovels.map((novel, index) => (
          <div key={novel.id} className="w-[calc(50%-8px)] bg-soft-background py-4 px-3 rounded-md">
            <Link
              href={`/novel/${novel.id}`}
              className="block w-full h-48 relative overflow-hidden rounded-lg"
            >
              <Image src={novel.image} alt={novel.title} fill sizes="50%" priority={index < 5} />
            </Link>

            <div className="mt-3">
              <Link
                href={`/novel/${novel.id}`}
                title={novel.title}
                className="block truncate font-semibold"
              >
                {novel.title}
              </Link>

              <Link
                href={`/author/${novel.user.id}`}
                className="flex gap-x-2 items-center text-sm text-soft-foreground mt-1"
              >
                <UserAvatar user={novel.user} className="size-5 rounded-sm" />
                <span className="mt-1">{getUserName(novel.user)}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
