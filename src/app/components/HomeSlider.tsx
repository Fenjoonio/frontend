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
          href="/novel/6"
          className="w-full h-48 flex items-center justify-center rounded-sm overflow-hidden relative px-4"
        >
          <Image
            src="https://s3.lexoya.com/fenjoon/novels/12752e71-b0f2-466a-b150-b5408861482f.png"
            alt="تصویر داستان"
            fill
            priority
            className="object-cover blur-xs"
          />

          <div className="flex flex-col justify-center items-center relative z-10">
            <span className="text-center text-xl text-light-gray-100 font-black">بی‌لیاقت</span>
            <span className="text-center text-sm text-light-gray-100 mt-1">
              گاهی یک داستان کوتاه، می‌تواند روزت را عوض کند.
            </span>
            <span className="bg-white text-primary rounded-sm py-1 px-6 mt-4">خواندن</span>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="px-5">
        <Link
          href="/novel/7"
          className="w-full h-48 flex items-center justify-center rounded-sm overflow-hidden relative px-4"
        >
          <Image
            src="https://s3.lexoya.com/fenjoon/novels/05860b51-1c20-452e-8b6a-264fa401b70d.jpg"
            alt="تصویر داستان"
            fill
            className="object-cover blur-xs"
          />

          <div className="flex flex-col justify-center items-center relative z-10">
            <span className="text-center text-xl text-light-gray-100 font-black">مجسمه‌ساز</span>
            <span className="text-center text-sm text-light-gray-100 mt-1">
              هر کلمه، دری به دنیایی دیگر است… آماده‌ای وارد شوی؟
            </span>
            <span className="bg-white text-primary rounded-sm py-1 px-6 mt-4">خواندن</span>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="px-5">
        <Link
          href="/novel/2"
          className="w-full h-48 flex items-center justify-center rounded-sm overflow-hidden relative px-4"
        >
          <Image
            src="https://s3.lexoya.com/fenjoon/novels/f1125435-d45f-41bc-a143-915faed27854.png"
            alt="تصویر داستان"
            fill
            className="object-cover blur-xs"
          />

          <div className="flex flex-col justify-center items-center relative z-10">
            <span className="text-center text-xl text-light-gray-100 font-black">جزیره نامرئی</span>
            <span className="text-center text-sm text-light-gray-100 mt-1">
              دنیا پر از قصه‌هایی‌ست که هنوز نخوانده‌ای.
            </span>
            <span className="bg-white text-primary rounded-sm py-1 px-6 mt-4">خواندن</span>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
