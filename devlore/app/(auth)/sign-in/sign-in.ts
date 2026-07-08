import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) return { success: false, message: error.message };

    return { success: true, message: "Signed in succesfully" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });

  if (data.error) {
    return { success: false, message: data?.error.message };
  }

  return { success: true, message: "Signed in with google successfully" };
};
