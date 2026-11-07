import type { Session } from "@/types";

export const canEditPost = (session: Session, postOwnerId: string) => {
  return (
    session?.user.role === "admin" ||
    session?.user.id.toString() === postOwnerId.toString()
  );
};
