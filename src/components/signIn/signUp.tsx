'use client'

import { useState } from "react"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { auth } from "@/lib/firebase"
import { toast } from "@/hooks/use-toast"

export function SignUp() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [CreateUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)

  const handleSignUp = async () => {
    try {
      await CreateUserWithEmailAndPassword(email, password)
      setEmail('')
      setPassword('')
      toast({
        variant: "default",
        title: 'Conta criada com sucesso',
        duration: 3000,
        className: 'border border-green-500 text-green-500'
      })
    } catch (e) {
      toast({
        variant: "default",
        title: 'Requisitos invalidos',
        duration: 3000,
        className: 'border border-red-500 text-red-500'
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="flex gap-1 font-semibold">
          Registar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Cadastrar-se</DialogTitle>
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
        <DialogFooter className="gap-2">
          <DialogClose>
            <Button type="submit" onClick={handleSignUp}>Salvar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}