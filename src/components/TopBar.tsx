'use client'

import { SignIn } from "@/components/signIn/SignIn";
import { SignUp } from "@/components/signIn/signUp";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function TopBar() {

  const router = useRouter()
  const [user] = useAuthState(auth)

  const handleLogout = () => {
    signOut(auth)
    router.push('/')
  }
  return (
    <div className="flex max-w-7xl mx-auto justify-between h-auto py-5">
      <div className="flex w-1/6 justify-start items-center">
        <Link href='/'>
          <Image src='/logo.png' alt="logo" width={200} height={200} quality={100} />
        </Link>
      </div>
      <div className="flex flex-1 justify-end items-center gap-2">
        {!user &&
          <div className="flex items-center">
            <SignIn /> /
            <SignUp />
          </div>}
        {user &&
          <div className='flex items-center gap-2'>
            <p>{user.email}</p>
            <Button variant='outline' onClick={handleLogout}>
              Sair
            </Button>
          </div>}
        <ToggleTheme />
      </div>
    </div>
  )
}