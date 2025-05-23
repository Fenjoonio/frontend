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
          href="https://instagram.com/fenjoon.io"
          className="w-full h-48 flex flex-col justify-center items-center bg-primary rounded-sm px-4"
        >
          <span className="text-center text-xl text-light-gray-100 font-black">
            فنجون رو دنبال کنید!
          </span>
          <span className="text-center text-sm text-light-gray-100 mt-1">
            صفحه اینستاگرام فنجون ساخته شده، یادتون نره دنبالمون کنید!
          </span>
          <span className="bg-white text-primary rounded-sm py-1 px-6 mt-4">دنبال کردن</span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="px-5">
        <Link
          href="/thread"
          className="w-full h-48 flex flex-col justify-center items-center bg-success rounded-sm px-4"
        >
          <span className="text-xl text-light-gray-100 font-black">اگه خودش باشه چی؟ ...</span>
          <span className="text-sm text-light-gray-100 mt-1">
            دوست داری بعدش چی بشه؟ بقیه‌ش رو تو بنویس!
          </span>
          <span className="bg-white text-success rounded-sm py-1 px-6 mt-4">بزن بریم!</span>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
