import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { decrypt } from "./session";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("3w3k0")?.value;
  const session = await decrypt(cookie);

  if (!session?.id) {
    redirect("/auth");
  }

  return { isAuth: true, id: session.id };
});
