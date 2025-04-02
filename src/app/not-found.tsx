import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "خطا ۴۰۴ - این برگ از داستان گمشده است",
};

export default function GlobalNotFoundPage() {
  return (
    <section>
      <div className="h-[calc(100svh-57px)] flex flex-col items-center justify-center px-4">
        <span className="text-6xl font-bold">404</span>
        <h1 className="text-lg font-bold mt-4">این برگ از داستان گمشده است!</h1>
        <span className="text-soft-foreground text-center mt-2">
          صفحه‌ای که دنبالش می‌گردی وجود نداره؛ یا شایدم یه لینک موقت بوده که الان دیگه به جایی وصل
          نیست ..
        </span>

        <Link href="/" className="mt-10">
          <Button variant="link">برگرد به صفحه اصلی</Button>
        </Link>
      </div>
    </section>
  );
}
