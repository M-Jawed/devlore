import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const NotFound = () => {
  return (
    <div className={`${geist.className} flex-center h-screen`}>
      <div className="flex-center flex-col space-y-4 -mt-12">
        <Image
          src={"/images/logo.png"}
          alt="Devlore logo png"
          width={200}
          height={200}
        />

        <h1 className="text-7xl font-bold -mt-6 text-blue-800">404</h1>
        <h2 className="font-bold text-3xl">Page not found</h2>
        <p className="text-sm text-muted-foreground">
          The page you are looking for doesn't exist or has been moved
        </p>

        <div>
          <Button asChild variant={"outline"}>
            <Link href={"/posts"}>
              Back to home <FaArrowRightLong />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
