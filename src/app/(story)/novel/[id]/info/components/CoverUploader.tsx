"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { ImageIcon, TrashIcon } from "lucide-react";
import { useGetNovelById, useUploadCoverImage } from "@/services/novels";

const MAX_SIZE_KB = 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const uploaderStyles = {
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23505050FF' stroke-width='4' stroke-dasharray='12%2c 20' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
};

export default function CoverUploader() {
  const params = useParams<{ id: string }>();
  const { data: novel } = useGetNovelById({ id: +params.id });
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate: uploadCoverImage } = useUploadCoverImage({ id: +params.id });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const isAcceptedType = ACCEPTED_TYPES.includes(file.type);

    if (!isAcceptedType) {
      e.target.value = "";
      toast.error("فرمت فایل انتخاب شده معتبر نیست");

      return;
    }

    const size = file.size / 1024;

    if (size > MAX_SIZE_KB) {
      e.target.value = "";
      toast.error("حجم تصویر نباید بیشتر از 1 مگابایت باشد.");

      return;
    }

    setPreview(URL.createObjectURL(file));
    uploadCoverImage({ id: +params.id, image: file });
  };

  const handleRemove = () => {
    setPreview(null);
  };

  return (
    <div>
      <label htmlFor="cover">
        <div
          style={uploaderStyles}
          className="relative w-32 h-44 shrink-0 flex items-center justify-center text-soft-foreground rounded-md overflow-hidden cursor-pointer"
        >
          {preview || novel?.coverImage ? (
            <>
              <Image
                src={preview || novel?.coverImage || ""}
                width={128}
                height={176}
                alt="کاور داستان"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 bg-background rounded-full p-1 shadow-md"
              >
                <TrashIcon className="size-4 text-red-500" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <ImageIcon className="size-8 stroke-1" />
              <span className="mt-4 text-sm">تصویر داستان</span>
              <span className="mt-1 text-xs text-muted-foreground">نسبت 9x16</span>
            </div>
          )}
        </div>
      </label>

      <input
        type="file"
        id="cover"
        accept="image/png,image/jpg,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
