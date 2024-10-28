'use client'

import { addExpense } from "@/app/firebase/addDocs"
import { expenseProps } from "@/app/types/globalTypes"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { CirclePlus } from 'lucide-react';
import MaskedCurrencyInput from "../masks/MaskCurrencyInput"


export function AddExpense() {
  const { toast } = useToast()

  const [expense, setExpense] = useState<expenseProps>({
    id: '',
    name: '',
    value: '',
    date: ''
  })

  const addstudent = async () => {
    if (expense.name === '') {
      toast({
        variant: "default",
        title: 'Nome Inválido',
        duration: 3000,
        className: 'border-2 border-red-500'
      })
    } else {
      addExpense(expense)
      toast({
        variant: "default",
        title: "Cliente Adicionado com sucesso.",
        duration: 3000,
        className: 'border-2 border-green-500'
      })
      setExpense({ id: '', name: '', value: '', date: '' })
    }
  }

  const cancelarAddstudent = () => {
    setExpense({ id: '', name: '', value: '', date: '' })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-1 font-semibold">
          <CirclePlus />
          <p className="hidden lg:flex">Nova Despesa</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80 sm:w-[400px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Nova Despesa</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="name" className="text-left w-full font-semibold">
              Nome
            </Label>
            <Input
              id="name"
              type="string"
              onChange={(e) => setExpense({ ...expense, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
              Valor
            </Label>
            <MaskedCurrencyInput value={expense.value} onChange={(e) => setExpense({ ...expense, value: e })} />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
              Data
            </Label>
            <Input
              id="maturity"
              type="Date"
              className="col-span-3"
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
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