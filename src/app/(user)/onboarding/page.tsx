import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <section className="h-svh flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold">به فنجون خوش اومدی!</h1>
      <p className="text-soft-foreground text-center mt-2">
        اینجا میتونی کلی داستان کوتاه بخونی و بنویسی و لذت ببری!
      </p>

      <Link href="/">
        <Button className="w-40 mt-16">بزن بریم!</Button>
      </Link>
    </section>
  );
}
