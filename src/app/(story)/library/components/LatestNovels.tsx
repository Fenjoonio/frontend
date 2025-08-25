import Link from "next/link";
import { useMemo } from "react";
import { ChevronLeftIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetInfiniteNovels } from "@/services/novels";
import VerticalNovelCard from "@/app/(story)/components/VerticalNovelCard";

type LatestNovelsProps = {
  className?: string;
};

export default function LatestNovels({ className }: LatestNovelsProps) {
  const { data } = useGetInfiniteNovels({ limit: 20 });

  const novels = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.items ?? []) : [];
  }, [data?.pages]);

  return (
    <section className={className}>
      <div className="flex justify-between items-center mx-5">
        <h2 className="text-sm text-soft-foreground">آخرین داستان‌ها</h2>
        <Link href="/library/latest" className="flex items-center gap-x-1 text-sm text-primary">
          نمایش همه
          <ChevronLeftIcon className="size-3.5" />
        </Link>
      </div>

      <Swiper
        freeMode
        spaceBetween={12}
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        breakpoints={{
          360: { slidesPerView: 3.6 },
          420: { slidesPerView: 4.1 },
          640: { slidesPerView: 4.6 },
        }}
        className="mt-3"
      >
        {novels.map((novel, index) => (
          <SwiperSlide key={index}>
            <VerticalNovelCard novel={novel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
