"use client";

import Link from "next/link";
import Image from "next/image";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { Swiper, SwiperSlide } from "swiper/react";

const novels = [
  {
    id: 0,
    title: "مغازه‌ی ساعت‌فروشی در کوچه‌ی بن‌بست",
    image: "https://s3.lexoya.com/fenjoon/novels/e51254b5-d45f-41ba-a143-915faed27854.png",
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
      createdAt: "2025-03-03T14:32:37.68221Z",
      phone: "",
    },
  },
  {
    id: 1,
    title: "جزیره نامرئی",
    image: "https://s3.lexoya.com/fenjoon/novels/f1125435-d45f-41bc-a143-915faed27854.png",
    summery: `مردی که همه حرف‌هایش را باور نمی‌کنند، نقشه‌ای اسرارآمیز از جزیره‌ای ناشناخته پیدا می‌کند. با کوله‌باری از امید و دوربینی کهنه، به سفری پر رمز و راز می‌رود تا اثبات کند حقیقتی که می‌گوید واقعی است. اما آنچه در آن جزیره انتظارش را می‌کشد، چیزی فراتر از تصوراتش است؛ جایی که واقعیت و سرنوشت به هم گره خورده‌اند.`,
    user: {
      id: 108,
      bio: "نویسنده رمان پسری با چشمان سیاه و علاقه شدید به رمان نویسی",
      followersCount: 4,
      followingsCount: 2,
      isFollowedByUser: false,
      firstName: "فاطمه",
      lastName: "حسنلو",
      nickname: "فاطمه",
      isVerified: false,
      isBot: false,
      isPremium: false,
      profileImage:
        "https://s3.lexoya.com/fenjoon/profiles/c6909354-242f-4ec3-af15-d0109109cb24.jpeg",
      phone: "",
      createdAt: "2025-03-03T14:32:37.68221Z",
    },
  },
];

type HomeNovelsProps = {
  className?: string;
};

export default function HomeNovels({ className }: HomeNovelsProps) {
  return (
    <Swiper
      freeMode
      spaceBetween={16}
      slidesOffsetBefore={20}
      slidesOffsetAfter={20}
      breakpoints={{ 320: { slidesPerView: 2.2 }, 420: { slidesPerView: 2.8 } }}
      className={className}
    >
      {novels.map((novel) => (
        <SwiperSlide key={novel.id}>
          <div className="bg-soft-background py-4 px-3 rounded-md">
            <Link
              href={`/novel/${novel.id}`}
              className="block w-full h-48 relative overflow-hidden rounded-lg"
            >
              <Image src={novel.image} alt={novel.title} fill />
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
