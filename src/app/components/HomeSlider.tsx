"use client";

import Link from "next/link";
import SwiperJS from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type HomeSliderProps = {
  className?: string;
};

export default function HomeSlider({ className }: HomeSliderProps) {
  SwiperJS.use([Autoplay]);

  return (
    <Swiper autoplay={{ delay: 10_000 }} loop className={className}>
      <SwiperSlide className="px-5">
        <Link
          href="/thread"
          className="w-full h-48 flex flex-col justify-center items-center bg-success rounded-sm"
        >
          <span className="text-xl text-light-gray-100 font-black">
            خیلی وقت بود منتظرت بودم ...
          </span>
          <span className="text-sm text-light-gray-100 mt-1">
            دوست داری بعدش چی بشه؟ بقیه‌ش رو تو بنویس!
          </span>
          <span className="bg-white text-success rounded-sm py-1 px-6 mt-4">بزن بریم!</span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="px-5">
        <Link
          href="https://survey.porsline.ir/s/NjmYt7vS"
          className="w-full h-48 flex flex-col justify-center items-center bg-primary rounded-sm"
        >
          <span className="text-xl text-light-gray-100 font-black">حالت نمایش روشن؟</span>
          <span className="text-xl text-light-gray-100 font-black mt-1">
            سرعت بیشتر؟ هرچی تو بخوای!
          </span>
          <span className="bg-white text-primary rounded-sm py-1 px-6 mt-4">بعدی رو تو بگو!</span>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
