"use client";

import Link from "next/link";
import { PlusIcon } from "lucide-react";
import BackArrow from "@/components/BackArrow";
import { Button } from "@/components/ui/button";
import LatestNovels from "./components/LatestNovels";
import UpdatedNovels from "./components/UpdatedNovels";

export default function LibraryPage() {
  return (
    <section className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">کتابخانه</h1>
      </header>

      <UpdatedNovels className="mt-14" />

      <LatestNovels className="mt-14" />

      <Link href="/novel/new">
        <Button
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
          className="w-14 fixed left-4"
        >
          <PlusIcon className="size-5" />
        </Button>
      </Link>
    </section>
  );
}
