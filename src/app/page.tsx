import { InfoArea } from "@/components/InfoArea";
import TableUsers from "@/components/TableUsers";
import { ToggleTheme } from "@/components/ToggleTheme";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between h-auto py-5">
        <div className="flex w-1/4 justify-start items-center">
          <Link href='/'>
            <Image src='/logo.png' alt="logo" width={200} height={200} quality={100} />
          </Link>
        </div>
        <div className="flex w-1/2 justify-center items-center">
          <InfoArea />
        </div>
        <div className="flex w-1/4 justify-end items-center">
          <ToggleTheme />
        </div>
      </div>
      <div>
        <TableUsers />
      </div>
    </div>
  );
}
