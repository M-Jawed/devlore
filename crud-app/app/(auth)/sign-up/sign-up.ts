import { authClient } from "@/lib/auth-client";
import { formatError } from "@/lib/utils";

export const signUp = async ({
  data,
}: {
  data: { name: string; username: string; email: string; password: string };
}) => {
  try {
    const { error } = await authClient.signUp.email({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) return { success: true, message: formatError(error) };

    return { success: true, message: "Signed up succesfully" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};
