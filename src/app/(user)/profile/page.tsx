import Link from "next/link";
import { getUtmSource } from "./actions";
import UserInfo from "./components/UserInfo";
import LogoutButton from "./components/LogoutButton";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ViewProfileButton from "./components/ViewProfileButton";
import {
  ArrowLeftIcon,
  DownloadIcon,
  NotebookPenIcon,
  ScaleIcon,
  StarIcon,
  UserPenIcon,
} from "lucide-react";

const getDownloadLinkBaseOnUtmSource = (utmSource: string) => {
  if (utmSource === "bazzar") {
    return { text: "دانلود از بازار", link: "https://cafebazaar.ir/app/io.fenjoon.app" };
  }

  if (utmSource === "myket") {
    return { text: "دانلود از مایکت", link: "https://myket.ir/app/io.fenjoon.app" };
  }

  return {
    text: "بروزرسانی (نسخه ۰.۱.۸)",
    link: "https://github.com/freakingeek/fenjoon-app/releases/download/0.1.8/Fenjoon-0.1.8.apk",
  };
};

export default async function ProfilePage() {
  const utmSource = await getUtmSource();
  const downloadLink = getDownloadLinkBaseOnUtmSource(utmSource);

  return (
    <section className="pt-16 pb-4">
      <header className="flex flex-col items-center">
        <UserInfo />
      </header>

      <div className="px-5 mt-14">
        <h2 className="text-xs text-soft-foreground">حساب کاربری</h2>

        <ul className="bg-soft-background rounded-xl divide-y divide-border p-2 mt-4">
          <li>
            <Link href="/profile/edit" className="flex gap-x-2 items-center py-3 px-2">
              <div className="bg-background rounded-lg p-2">
                <UserPenIcon className="size-5" />
              </div>

              <span className="text-sm  mt-[2px]">ویرایش اطلاعات شخصی</span>

              <ArrowLeftIcon className="size-5 ms-auto me-1" />
            </Link>
          </li>

          <li>
            <ViewProfileButton />
          </li>

          <li>
            <Link href="/profile/stories" className="flex gap-x-2 items-center py-3 px-2">
              <div className="bg-background rounded-lg p-2">
                <NotebookPenIcon className="size-5" />
              </div>

              <span className="text-sm  mt-[2px]">داستانک‌های من</span>

              <ArrowLeftIcon className="size-5 ms-auto me-1" />
            </Link>
          </li>

          <li>
            <Link
              href="https://survey.porsline.ir/s/NjmYt7vS"
              className="flex gap-x-2 items-center py-3 px-2"
            >
              <div className="bg-background rounded-lg p-2">
                <StarIcon className="size-5" />
              </div>

              <span className="text-sm mt-[2px]">پیشنهادات و انتقادات</span>

              <ArrowLeftIcon className="size-5 ms-auto me-1" />
            </Link>
          </li>

          <li>
            <Link href="/legal/terms" className="flex gap-x-2 items-center py-3 px-2">
              <div className="bg-background rounded-lg p-2">
                <ScaleIcon className="size-5" />
              </div>

              <span className="text-sm mt-0.5">قوانین استفاده</span>

              <ArrowLeftIcon className="size-5 ms-auto me-1" />
            </Link>
          </li>
        </ul>
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs text-soft-foreground">برنامه</h2>

        <ul className="bg-soft-background rounded-xl divide-y divide-border p-2 mt-4">
          <li>
            <Link href={downloadLink.link} className="flex gap-x-2 items-center py-3 px-2">
              <div className="bg-background rounded-lg p-2">
                <DownloadIcon className="size-5" />
              </div>

              <span className="text-sm mt-0.5">{downloadLink.text}</span>

              <ArrowLeftIcon className="size-5 ms-auto me-1" />
            </Link>
          </li>

          <li>
            <ThemeSwitcher />
          </li>

          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </section>
  );
}
