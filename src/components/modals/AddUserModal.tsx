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
    const [year, month, day] = student.maturity?.split('-')
    if (student.name === '') {
      toast({
        variant: "default",
        title: 'Nome Inválido',
        duration: 3000,
        className: 'border-2 border-red-500'
      })
    } else if (parseInt(day) > 28) {
      toast({
        variant: "default",
        title: "Vencimento invalido.",
        description: "Informe um dia até dia 28",
        duration: 3000,
        className: 'border-2 border-red-500'
      })
    } else {
      addUser(student)
      toast({
        variant: "default",
        title: "Cliente Adicionado com sucesso.",
        duration: 3000,
        className: 'border-2 border-green-500'
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
          <p className="hidden sm:flex">Novo Aluno</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80 sm:w-[400px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Novo Aluno</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="name" className="text-left w-full font-semibold">
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
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
              Número do Celular
            </Label>
            <MaskedTelephoneInput value={student.telephone} onChange={(e) => setStudent({ ...student, telephone: e })} />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
              Mensalidade
            </Label>
            <MaskedCurrencyInput value={student.monthly} onChange={(e) => setStudent({ ...student, monthly: e })} />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
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
        <DialogFooter>
          <DialogClose>
            <div className="flex gap-1 sm:gap-2">
              <Button type="button" variant='outline' onClick={cancelarAddstudent} className="w-full">Cancelar</Button>
              <Button type="submit" onClick={() => addstudent()} className="w-full">Salvar</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}