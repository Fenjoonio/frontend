"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import BackArrow from "@/components/BackArrow";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import NovelChapters from "./components/NovelChapters";
import CoverUploader from "./components/CoverUploader";
import { useEditNovel, useGetNovelById, usePublishNovel } from "@/services/novels";
import MenuSheet from "./components/MenuSheet";

export default function NovelInfoPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { id } = useParams<{ id: string }>();
  const [description, setDescription] = useState("");
  const { data: novel } = useGetNovelById({ id: +id });

  const { mutateAsync: editNovel, isPending: isEditPending } = useEditNovel({ id: +id });

  const { mutateAsync: publishNovel, isPending: isPublishPending } = usePublishNovel({ id: +id });

  useEffect(() => {
    if (!novel) return;

    setTitle(novel.title);
    setDescription(novel.description);
  }, [novel]);

  const edit = async () => {
    await editNovel({ id: +id, title, description });
  };

  const editAndPublish = async () => {
    await edit();
    await publishNovel();
  };

  const onButtonClick = async () => {
    const action = novel?.isPublished ? edit : editAndPublish;

    await action();
    router.push(`/novel/${id}`);
  };

  if (!novel) {
    return (
      <div className="size-full fixed top-0 right-0 flex items-center justify-center bg-background">
        <span>در حال بارگذاری ...</span>
      </div>
    );
  }

  return (
    <section className="min-h-svh pb-20">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow className="shrink-0" />
        <h1 className="text-lg font-bold truncate mt-1">اطلاعات داستان</h1>

        <MenuSheet
          novelId={+id}
          className="size-10 flex items-center justify-center cursor-pointer ms-auto"
        />
      </header>

      <div className="px-5 mt-4">
        <CoverUploader />

        <Input
          value={title}
          maxLength={150}
          placeholder="عنوان داستان"
          className="mt-8"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          maxLength={2000}
          value={description}
          placeholder="خلاصه داستان"
          className="min-h-40 max-h-64 resize-none !bg-transparent p-4 mt-4"
          onChange={(e) => setDescription(e.target.value)}
        />

        <h3 className="text-sm text-soft-foreground mt-6">بخش‌ها</h3>

        <NovelChapters chapters={novel?.chapters || []} />
      </div>

      <div
        style={{ bottom: "env(safe-area-inset-bottom)" }}
        className="max-w-[480px] fixed bottom-0 right-0 left-0 mx-auto bg-background"
      >
        <Button
          disabled={isPublishPending || isEditPending}
          className="w-full rounded-none"
          onClick={onButtonClick}
        >
          {novel?.isPublished ? "بروزرسانی داستان" : "انتشار داستان"}
        </Button>
      </div>
    </section>
  );
}
