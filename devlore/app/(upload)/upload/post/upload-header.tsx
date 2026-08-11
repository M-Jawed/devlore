import Image from "next/image";
import Link from "next/link";
import UserButton from "@/components/shared/header/user-button";
import UploadPostButton from "./upload-button";
import EditPostButton from "../../edit/[postId]/edit-button";

const UploadHeader = ({ type }: { type: "upload" | "update" }) => {
  return (
    <header className="w-full h-18 flex-center">
      <div className="flex-between w-full md:w-[70%] lg:w-[60%] px-4 fixed bg-background">
        <div>
          <Link href={"/posts"} className=" h-20 flex-center">
            <Image
              src={"/images/logo.png"}
              alt="Logo of the web app devlore"
              width={150}
              height={50}
            />
          </Link>
        </div>

        <div className="flex items-center gap-x-2">
          {type === "upload" ? (
            <UploadPostButton type={"header"} />
          ) : (
            <EditPostButton type={"header"} />
          )}
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default UploadHeader;
