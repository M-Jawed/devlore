"use server";

import { revalidatePath } from "next/cache";

export const signOutAction = async () => {
  revalidatePath("/");
};
