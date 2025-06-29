import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import MenuSheet from "./components/MenuSheet";
import BackArrow from "@/components/BackArrow";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import NovelChapters from "./components/NovelChapters";

const novels = [
  {
    id: 0,
    title: "مغازه‌ی ساعت‌فروشی در کوچه‌ی بن‌بست",
    image: "https://s3.lexoya.com/fenjoon/novels/e51254b5-d45f-41ba-a143-915faed27854.png",
    summery: `امیر، مردی چهل‌ساله و منزوی، به‌طور اتفاقی در یک کوچه‌ی باریک و بن‌بست، وارد مغازه‌ی قدیمی ساعت‌فروشی می‌شود که تا به‌حال آن را ندیده بوده. صاحب مغازه، پیرمردی مرموز به نام استاد زوار، به امیر می‌گوید که هر ساعت در مغازه‌اش می‌تواند لحظه‌ای از گذشته‌ی خریدار را بازگرداند—اما فقط برای پنج دقیقه. امیر ابتدا باور نمی‌کند، اما پس از یک تجربه‌ی کوتاه و تکان‌دهنده، وسوسه می‌شود بارها به آن مغازه برگردد تا اشتباهاتش را اصلاح کند، حرف‌های نگفته را بزند و لحظاتی را که از دست داده دوباره زندگی کند. اما هر بار بازگشت، بهایی دارد—و امیر کم‌کم درمی‌یابد که در گذشته ماندن، بهایی سنگین‌تر از آنی دارد که فکر می‌کرد...`,
    chapters: [
      {
        id: 0,
        title: "بخش اول: کوچه‌ای که نبود، و مغازه‌ای که باید فراموش می‌شد",
      },
      {
        id: 1,
        title: "بخش دوم: پنج دقیقه با گذشته",
      },
      {
        id: 2,
        title: "بخش سوم: اولین سفر",
      },
      {
        id: 3,
        title: "بخش چهارم: بهای لحظه‌ها",
      },
      {
        id: 4,
        title: "بخش پنجم: معامله با آینده",
      },
      {
        id: 5,
        title: "بخش ششم: سقوط در گذشته",
      },
      {
        id: 6,
        title: "بخش پایانی: آخرین تیک‌تاک",
      },
    ],
    user: {
      id: 3,
      bio: "",
      followersCount: 0,
      followingsCount: 0,
      isFollowedByUser: false,
      firstName: "",
      lastName: "",
      nickname: "آوا",
      isVerified: false,
      isBot: true,
      isPremium: false,
      profileImage:
        "https://s3.lexoya.com/fenjoon/profiles/0f9ca444-c461-4b37-b2b4-36b794b22d80-db338039.png",
      phone: "",
      createdAt: "2025-03-03T14:32:37.68221Z",
    },
  },
];

type NovelPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NovelPage({ params }: NovelPageProps) {
  const { id } = await params;
  const novel = novels.find((novel) => novel.id === Number(id));

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
            <Image src={novel.image} alt={novel.title} fill className="object-cover" />
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

        <p className="whitespace-pre-line line-clamp-6 leading-6 mt-2">{novel.summery}</p>

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
