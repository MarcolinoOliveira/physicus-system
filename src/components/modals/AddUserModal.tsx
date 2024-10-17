'use client'

import { addUser } from "@/app/firebase/addDocs"
import { userProps } from "@/app/types/globalTypes"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { CirclePlus } from 'lucide-react';
import MaskedCurrencyInput from "../masks/MaskCurrencyInput"
import MaskedTelephoneInput from "../masks/MaskTelephoneInput"


export function AddClient() {
  const { toast } = useToast()

  const [student, setStudent] = useState<userProps>({
    id: '',
    name: '',
    telephone: '',
    maturity: '',
    status: '',
    monthly: ''
  })

  const addstudent = async () => {
    if (student.name === '') {
      toast({
        variant: "default",
        title: 'Nome Inválido',
        duration: 3000,
        className: 'border border-red-500 text-red-500'
      })
    } else {
      addUser(student)
      toast({
        variant: "default",
        title: "Cliente Adicionado com sucesso.",
        duration: 3000,
        className: 'border border-green-500 text-green-500'
      })
      setStudent({ id: '', name: '', telephone: '', maturity: '', status: '', monthly: '' })
    }
  }

  const cancelarAddstudent = () => {
    setStudent({ id: '', name: '', telephone: '', maturity: '', status: '', monthly: '' })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex gap-1 font-semibold">
          <CirclePlus />
          Novo Aluno
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Novo student</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="name" className="text-left font-semibold">
              Nome Completo
            </Label>
            <Input
              id="name"
              type="string"
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              className="col-span-3"
              required={true}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Número do Celular
            </Label>
            <MaskedTelephoneInput value={student.telephone} onChange={(e) => setStudent({ ...student, telephone: e })} />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Mensalidade
            </Label>
            <MaskedCurrencyInput value={student.monthly} onChange={(e) => setStudent({ ...student, monthly: e })} />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Vencimento
            </Label>
            <Input
              id="maturity"
              type="Date"
              className="col-span-3"
              onChange={(e) => setStudent({ ...student, maturity: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose>
            <Button type="button" variant='outline' onClick={cancelarAddstudent} className="mr-2">Cancelar</Button>
            <Button type="submit" onClick={() => addstudent()}>Salvar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}