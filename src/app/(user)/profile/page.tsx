import Link from "next/link";
import { getUtmSource } from "./actions";
import UserInfo from "./components/UserInfo";
import LogoutButton from "./components/LogoutButton";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ViewProfileButton from "./components/ViewProfileButton";
import { ArrowLeftIcon, DownloadIcon, ScaleIcon, StarIcon, UserPenIcon } from "lucide-react";

export default async function ProfilePage() {
  const utmSource = await getUtmSource();

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
                <UserPenIcon className="size-5 " />
              </div>

              <span className="text-sm  mt-[2px]">ویرایش اطلاعات شخصی</span>

              <ArrowLeftIcon className="size-5 ms-auto me-1" />
            </Link>
          </li>

          <li>
            <ViewProfileButton />
          </li>

          <li>
            <Link
              href="https://survey.porsline.ir/s/NjmYt7vS"
              className="flex gap-x-2 items-center py-3 px-2"
            >
              <div className="bg-background rounded-lg p-2">
                <StarIcon className="size-5 " />
              </div>

              <span className="text-sm  mt-[2px]">پیشنهادات و انتقادات</span>

              <ArrowLeftIcon className="size-5 ms-auto me-1" />
            </Link>
          </li>

          <li>
            <Link href="/legal/terms" className="flex gap-x-2 items-center py-3 px-2">
              <div className="bg-background rounded-lg p-2">
                <ScaleIcon className="size-5 " />
              </div>

              <span className="text-sm  mt-[2px]">قوانین استفاده</span>

              <ArrowLeftIcon className="size-5 ms-auto me-1" />
            </Link>
          </li>
        </ul>
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs text-soft-foreground">برنامه</h2>

        <ul className="bg-soft-background rounded-[12px] divide-y divide-border p-2 mt-4">
          <li>
            <Link
              href={
                utmSource === "bazzar"
                  ? "https://cafebazaar.ir/app/io.fenjoon.app"
                  : "https://github.com/freakingeek/fenjoon-app/releases/download/0.1.4/Fenjoon-v0.1.4.apk"
              }
              className="flex gap-x-2 items-center py-3 px-2"
            >
              <div className="bg-background rounded-lg p-2">
                <DownloadIcon className="size-5" />
              </div>

              <span className="text-sm mt-[2px]">
                {utmSource === "bazzar" ? "بروزرسانی از طریق بازار" : "بروزرسانی (نسخه ۰.۱.۴)"}
              </span>

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
