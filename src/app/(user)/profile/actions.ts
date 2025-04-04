"use server";

import { cookies } from "next/headers";

const UTM_SOURCE_KEY = "utmSource";

export async function getUtmSource() {
  const { get } = await cookies();

  return get(UTM_SOURCE_KEY)?.value || "organic";
}
