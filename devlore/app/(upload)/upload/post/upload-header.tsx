import Image from "next/image";
import Link from "next/link";
import UserButton from "@/components/shared/header/user-button";

const UploadHeader = () => {
  return (
    <header className="w-full h-18 flex-center">
      <div className="flex-between w-full md:w-[70%] lg:w-[60%]">
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

        <div>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default UploadHeader;
