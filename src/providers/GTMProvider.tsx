import { PropsWithChildren } from "react";
// import { isDev } from "@/lib/utils/environment";
// import { GoogleTagManager } from "@next/third-parties/google";

export default function GTMProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      {/* {!isDev() && <GoogleTagManager gtmId="GTM-WFZ5Z9X4" />} */}
    </>
  );
}
