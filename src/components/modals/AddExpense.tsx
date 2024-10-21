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
        className: 'border border-red-500 text-red-500'
      })
    } else {
      addExpense(expense)
      toast({
        variant: "default",
        title: "Cliente Adicionado com sucesso.",
        duration: 3000,
        className: 'border border-green-500 text-green-500'
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
          Nova Despesa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Nova Despesa</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="name" className="text-left font-semibold">
              Nome
            </Label>
            <Input
              id="name"
              type="string"
              onChange={(e) => setExpense({ ...expense, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Valor
            </Label>
            <MaskedCurrencyInput value={expense.value} onChange={(e) => setExpense({ ...expense, value: e })} />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
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