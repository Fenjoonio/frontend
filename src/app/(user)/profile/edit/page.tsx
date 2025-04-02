import EditProfileForm from "./components/EditProfileForm";

export default function ProfileEditPage() {
  return (
    <section className="h-svh flex flex-col pb-20">
      <div className="px-4 mt-16">
        <h1 className="text-lg font-bold">تکمیل پروفایل</h1>
        <span className="block text-sm text-soft-foreground mt-1">
          قبل از اینکه دنیا رو با داستانک‌هات تغییر بدی؛ لطفا پروفایلت رو تکمیل کن!
        </span>
      </div>

      <EditProfileForm className="flex-1 px-4 mt-10" />
    </section>
  );
}
