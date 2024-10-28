"use client"

import { UserRound } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { Button } from '../ui/button';
import { SignIn } from '../signIn/SignIn';
import { SignUp } from '../signIn/SignUp';

export function SubMenuSignIn() {

  const [openSignIn, setOpenSignIn] = useState<boolean>(false)
  const [openSignUp, setOpenSignUp] = useState<boolean>(false)

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size='icon'><UserRound /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto flex flex-col gap-2 p-1 border-border items-start" align='end'>
          <Button variant="ghost" onClick={() => setOpenSignIn(prev => !prev)}>
            Entrar
          </Button>
          <Button variant="ghost" onClick={() => setOpenSignUp(prev => !prev)}>
            Registrar
          </Button>
        </PopoverContent>
      </Popover>
      <SignIn open={openSignIn} setOpen={setOpenSignIn} />
      <SignUp open={openSignUp} setOpen={setOpenSignUp} />
    </div>
  )
}