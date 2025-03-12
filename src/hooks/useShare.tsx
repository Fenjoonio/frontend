import { toast } from "react-toastify";
import { postMessage } from "@/lib/utils/app";
import { isApp } from "@/lib/utils/environment";

export default function useShare() {
  const appShare = (data: ShareData) => {
    postMessage("share", data);
    toast.warn("بزودی ... :)")
  };

  const webShare = async (data: ShareData) => {
    await navigator.share(data);
  };

  const share = (data: ShareData) => {
    if (!("share" in navigator) || !navigator.canShare(data)) {
      toast.error("مرورگر شما از این قابلیت پشتیبانی نمی‌کند");
    }

    isApp() ? appShare(data) : webShare(data);
  };

  return { share };
}
