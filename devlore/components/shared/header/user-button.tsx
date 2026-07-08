import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserAvatar from "./user-avatar";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { getUserById } from "@/lib/actions/user.action";

const UserButton = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const user = await getUserById(session.user.id);
    return <UserAvatar session={session} userImage={user.image} />;
  }

  return (
    <Link href={"/sign-in"}>
      {" "}
      <Button size={"sm"} className="px-5">
        Sign in
      </Button>{" "}
    </Link>
  );
};

export default UserButton;
