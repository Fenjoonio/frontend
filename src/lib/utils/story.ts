import dayjs from "@/lib/utils/day";

export const formatStoryCreateAt = (date: string) => {
  return dayjs(date).calendar("jalali").fromNow();
};
