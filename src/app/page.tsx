'use client'

import { InfoArea } from "@/components/InfoArea";
import { SignIn } from "@/components/signIn/SignIn";
import { SignUp } from "@/components/signIn/signUp";
import TableUsers from "@/components/TableUsers";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from 'react-firebase-hooks/auth'


export default function Home() {
  const [user] = useAuthState(auth)

  const admin = 'bruno@phisycus.com'

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between h-auto py-5">
        <div className="flex w-1/4 justify-start items-center">
          <Link href='/'>
            <Image src='/logo.png' alt="logo" width={200} height={200} quality={100} />
          </Link>
        </div>
        <div className="flex w-1/2 justify-center items-center">
          {user?.email === admin && <InfoArea />}
        </div>
        <div className="flex w-1/4 justify-end items-center gap-2">
          {!user &&
            <div className="flex items-center">
              <SignIn /> /
              <SignUp />
            </div>}
          {user && <Button variant='outline' onClick={() => signOut(auth)}>Sair</Button>}
          <ToggleTheme />
        </div>
      </div>
      <div>
        <TableUsers />
      </div>
    </div>
  );
}
