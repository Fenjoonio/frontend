"use client";

import Image from "next/image";
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
          href="/novels/3"
          className="w-full h-48 flex items-center justify-center rounded-sm overflow-hidden relative px-4"
        >
          <Image
            src="https://s3.lexoya.com/fenjoon/banners/t5125425-f45f-41ec-a143-915faed27823.png"
            alt="تصویر داستان"
            fill
            className="object-cover blur-xs"
          />

          <div className="flex flex-col justify-center items-center relative z-10">
            <span className="text-center text-xl text-light-gray-100 font-black">سبزپوشی خفته</span>
            <span className="text-center text-sm text-light-gray-100 mt-1">
              قصه دختری که میان سکوت، صدای مردم شد...
            </span>
            <span className="bg-white text-primary rounded-sm py-1 px-6 mt-4">خواندن</span>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
