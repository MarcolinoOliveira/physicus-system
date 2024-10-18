'use client'

import { useState } from "react"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { auth } from "@/lib/firebase"
import { toast } from "@/hooks/use-toast"

export function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const handleSignUp = async () => {
    try {
      const res = await SignInWithEmailAndPassword(email, password)
      if (res?.user) {
        toast({
          variant: "default",
          title: 'Logado com sucesso',
          duration: 3000,
          className: 'border border-green-500 text-green-500'
        })
        setOpen(prev => !prev)
        setEmail('')
        setPassword('')
      } else {
        toast({
          variant: "default",
          title: 'Conta Inválida',
          duration: 3000,
          className: 'border border-red-500 text-red-500'
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <Button variant="link" className="flex gap-1 font-semibold" onClick={() => setOpen(prev => !prev)}>
        <p className="text-card-foreground">Entrar</p>
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[350px]">
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
    </div>
  )
}