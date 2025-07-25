import VerifyForm from "./components/VerifyForm";

type VerifyPageProps = {
  searchParams: Promise<{
    phone: string | null;
    redirect: string | null;
    action: "login" | "register" | null;
  }>;
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { phone, action, redirect } = await searchParams;
  const censoredPhone = phone?.replace(/(\d{4})(\d{3})(\d{3})/, "$1***$3");

  return (
    <div className="h-[calc(100svh-57px)] flex flex-col px-5 pb-5">
      <header className="mt-16">
        <h1 className="text-lg font-bold">تایید شماره همراه</h1>
        <span className="block text-sm text-soft-foreground mt-1">
          برای عبور از این مرحله و دسترسی به امکانات فنجون، لطفا کد ۵ رقمی ارسال شده به شماره{" "}
          <span className="inline-block ltr text-sm leading-6">{censoredPhone}</span> را وارد کنید
        </span>
      </header>

      <VerifyForm phone={phone} action={action} redirect={redirect} className="flex-1 mt-20" />
    </div>
  );
}
