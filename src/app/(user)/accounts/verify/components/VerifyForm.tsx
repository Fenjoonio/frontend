"use client";

import { z } from "zod";
import Link from "next/link";
import { cn } from "@/lib/utils/classnames";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVerifyOtp } from "@/services/accounts";
import { useEffect, type ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toEnglishDigits } from "@/lib/utils/numbers";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthContext } from "@/providers/AuthProvider";
import { setUserCredentials } from "@/app/(user)/accounts/actions";

const schema = z.object({
  code: z.string().length(5, { message: "کد وارد شده صحیح نیست" }),
});

type Inputs = {
  code: string;
};

type VerifyFormProps = {
  className?: string;
  phone: string | null;
  redirect: string | null;
  action: "login" | "register" | null;
};

export default function VerifyForm({ phone, redirect, className }: VerifyFormProps) {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthContext();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const { mutate: login, isPending } = useVerifyOtp({
    onSuccess: async (response) => {
      await setUserCredentials({
        accessToken: response.tokens.accessToken,
        refreshToken: response.tokens.refreshToken,
      });

      setIsLoggedIn(!!response.tokens.accessToken);

      // NOTE: We need this to make sure cookie is present!
      setTimeout(() => {
        router.replace(redirect ? redirect : response.isNewUser ? "/profile/edit" : "/");
      }, 0);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login({ otpCode: data.code, phone: phone! });
  };

  useEffect(() => {
    if (!phone) router.replace("/accounts/login");
  }, [phone, router]);

  useEffect(() => {
    const getOTPFromSMS = async () => {
      if (!("OTPCredential" in window) || !window.navigator?.credentials) return;

      try {
        const otp: any = await window.navigator.credentials.get({
          otp: { transport: ["sms"] },
        } as any);

        if (!otp?.code) {
          throw new Error("کد تایید یافت نشد");
        }

        setValue("code", otp?.code || "");
      } catch {}
    };

    getOTPFromSMS();
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col justify-between", className)}
    >
      <div>
        <Input
          dir="ltr"
          autoFocus
          maxLength={5}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="کد تایید ۵ رقمی"
          className="placeholder:text-right"
          {...register("code", {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setValue("code", toEnglishDigits(e.target.value)),
          })}
        />
        <span className="block text-danger mt-2">{errors.code?.message || ""}</span>
      </div>

      <div className="flex gap-y-2 flex-col">
        <Button disabled={isPending}>بررسی و ادامه</Button>

        <Link href={`/accounts/login?phone=${phone}`}>
          <Button disabled={isPending} variant="outline" className="w-full">
            ارسال مجدد
          </Button>
        </Link>
      </div>
    </form>
  );
}
