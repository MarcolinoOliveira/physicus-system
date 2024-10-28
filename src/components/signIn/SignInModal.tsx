'use client'

import { Dispatch, SetStateAction, useState } from "react"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { auth } from "@/lib/firebase"
import { toast } from "@/hooks/use-toast"

type SignInProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function SignInModal({ open, setOpen }: SignInProps) {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const handleSignUp = async () => {
    try {
      const res = await SignInWithEmailAndPassword(email, password)
      if (res?.user) {
        toast({
          variant: "default",
          title: 'Logado com sucesso',
          duration: 3000,
          className: 'border-2 border-green-500'
        })
        setOpen(prev => !prev)
        setEmail('')
        setPassword('')
      } else {
        toast({
          variant: "default",
          title: 'Conta Inválida',
          duration: 3000,
          className: 'border-2 border-red-500'
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
      <DialogContent className="w-80 sm:max-w-[350px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="name" className="text-left font-semibold">
              Email:
            </Label>
            <Input
              id="email"
              type="string"
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Senha:
            </Label>
            <Input
              id="senha"
              type="password"
              className="col-span-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSignUp} className="w-full">Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}