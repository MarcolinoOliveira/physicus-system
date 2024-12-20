"use client"

import { UserRound } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { Button } from '../ui/button';
import { SignInModal } from '../signIn/SignInModal';
import { SignUpModal } from '../signIn/SignUpModal';

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
      <SignInModal open={openSignIn} setOpen={setOpenSignIn} />
      <SignUpModal open={openSignUp} setOpen={setOpenSignUp} />
    </div>
  )
}