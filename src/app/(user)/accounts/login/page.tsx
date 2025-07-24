import LoginForm from "./components/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    phone: string | null;
    redirect: string | null;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { phone, redirect } = await searchParams;

  return (
    <div className="h-[calc(100svh-57px)] flex flex-col px-5 pb-5">
      <header className="mt-16">
        <h1 className="text-lg font-bold">ثبت‌نام / ورود</h1>
        <span className="block text-sm text-soft-foreground mt-1">
          برای دسترسی به این بخش، نیازه که اطلاعات بیشتری از شما داشته باشیم
        </span>
      </header>

      <LoginForm phone={phone} redirect={redirect} className="flex-1 mt-20" />
    </div>
  );
}
