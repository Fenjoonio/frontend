export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center fixed top-0 right-0 bg-background z-20 pb-20">
      <div className="w-full text-center select-none mt-auto">
        <h1 className="text-8xl  font-extrabold">فــــ</h1>
      </div>

      <span className="text-sm text-soft-foreground mt-auto">در حال بارگذاری ...</span>
    </div>
  );
}
