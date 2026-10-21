import Image from "next/image";
import Link from "next/link";
import NavLinks from "./nav-links";

const DashboardHeader = () => {
  return (
    <header className="w-full h-20 border-b border-gray-300 flex-center">
      <div className="w-full md:w-[80%]">
        <div className="flex items-center gap-x-5">
          <Link href={"/posts"}>
            <Image
              src={"/images/logo.png"}
              alt="Image of the logo devlore"
              width={200}
              height={100}
            />
          </Link>

          <NavLinks />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
