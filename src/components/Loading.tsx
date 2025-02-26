export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-end fixed top-0 right-0 bg-[#2e2e2e] z-20 pb-20">
      <div className="w-[480px] mx-auto text-center relative mb-auto mt-auto select-none">
        <h1 className="text-7xl font-bold">فــــ</h1>
      </div>

      <span className="text-sm text-[#B0B0B0] mt-2">در حال بارگذاری ...</span>
    </div>
  );
}
