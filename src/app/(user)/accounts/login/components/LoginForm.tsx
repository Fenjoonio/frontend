"use client";

import { z } from "zod";
import { type ChangeEvent } from "react";
import { cn } from "@/lib/utils/classnames";
import { useRouter } from "next/navigation";
import { useOtpRequest } from "@/services/accounts";
import { toEnglishDigits } from "@/lib/utils/numbers";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const schema = z.object({
  phone: z
    .string()
    .length(11, { message: "شماره همراه وارد شده صحیح نیست" })
    .startsWith("09", { message: "شماره همراه وارد شده صحیح نیست" }),
});

type Inputs = {
  phone: string;
};

type LoginFormProps = {
  className?: string;
  phone: string | null;
  redirect: string | null;
};

export default function LoginForm({ phone, redirect, className }: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: { phone: phone || "" },
  });

  const { mutate, isPending } = useOtpRequest({
    onSuccess: (response) => {
      const params = new URLSearchParams();
      params.set("phone", response.phone);

      if (redirect) params.set("redirect", redirect);

      router.push(`/accounts/verify?${params.toString()}`);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({ phone: data.phone });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col justify-between", className)}
    >
      <div>
        <Input
          dir="ltr"
          maxLength={11}
          inputMode="numeric"
          placeholder="شماره همراه"
          className="placeholder:text-right"
          {...register("phone", {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setValue("phone", toEnglishDigits(e.target.value)),
          })}
        />
        <span className="block text-red-500 mt-2">{errors.phone?.message || ""}</span>
      </div>

      <div>
        <Button disabled={isPending} className="w-full mt-8">
          بررسی شماره همراه
        </Button>
        <span className="block text-xs text-center px-5 mt-4">
          وارد کردن شماره همراه در این مرحله به معنای پذیرش{" "}
          <Link href="/legal/terms" className="text-[#B07B56]">
            قوانین و شرایط استفاده
          </Link>{" "}
          از فنجون است.
        </span>
      </div>
    </form>
  );
}
