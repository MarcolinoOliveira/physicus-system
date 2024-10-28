'use client'

import { getListExpense, getMonthsPayment, getStudents } from "@/app/firebase/getDocs";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";
import useStudents from "@/hooks/useStudents";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubMenuSignIn } from "./subMenus/SubMenuSignIn";
import { SignInModal } from "./signIn/SignInModal";
import { SignUpModal } from "./signIn/SignUpModal";


export default function TopBar() {

  const [openSignIn, setOpenSignIn] = useState<boolean>(false)
  const [openSignUp, setOpenSignUp] = useState<boolean>(false)

  const { setStudents, setPayments, setExpenses } = useStudents()
  const router = useRouter()
  const [user] = useAuthState(auth)

  const handleLogout = () => {
    signOut(auth)
    router.push('/')
  }

  useEffect(() => {
    getStudents({ setStudents })
    getMonthsPayment({ setPayments })
    getListExpense(setExpenses)
  }, [])

  return (
    <div className="flex w-full md:max-w-7xl md:mx-auto justify-between h-auto py-5 px-2 fixed sm:relative z-50 bg-background">
      <div className="flex w-2/4 justify-start items-center ml-4 sm:ml-0">
        <Link href='/'>
          <Image src='/logo.png' alt="logo" width={200} height={200} quality={100} />
        </Link>
      </div>
      <div className="flex flex-1 justify-end items-center gap-1 sm:gap-2">
        {!user &&
          <>
            <div className="hidden sm:flex items-center">
              <Button variant='link' onClick={() => setOpenSignIn(prev => !prev)} className="text-accent-foreground">Entrar</Button>
              /
              <Button variant='link' onClick={() => setOpenSignUp(prev => !prev)} className="text-accent-foreground">Registrar</Button>
            </div>
            <div className="flex sm:hidden">
              <SubMenuSignIn />
            </div>
            <SignInModal open={openSignIn} setOpen={setOpenSignIn} />
            <SignUpModal open={openSignUp} setOpen={setOpenSignUp} />
          </>}
        {user &&
          <div className='flex items-center gap-2'>
            <p className="hidden sm:block">{user.email}</p>
            <Button variant='outline' onClick={handleLogout}>
              Sair
            </Button>
          </div>}
        <ToggleTheme />
      </div>
    </div>
  )
}