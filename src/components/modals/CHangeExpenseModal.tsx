'use client'

import { expenseProps } from "@/app/types/globalTypes"
import { Dispatch, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { updateExpense } from "@/app/firebase/updateDocs"
import { useToast } from "@/hooks/use-toast"
import MaskedCurrencyInput from "../masks/MaskCurrencyInput"
import { PencilLine } from 'lucide-react';

type ChangeExpenseModalProps = {
  expense: expenseProps
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function ChangeExpenseModal({ expense, open, setOpen }: ChangeExpenseModalProps) {
  const { toast } = useToast()

  const [changeExpense, setChangeExpense] = useState<expenseProps>({
    id: expense.id,
    name: expense.name,
    value: expense.value,
    date: expense.date
  })

  const changeData = () => {
    if (changeExpense?.name === '') {
      toast({
        variant: "default",
        title: "Nome inválido.",
        duration: 3000,
        className: 'border-2 border-red-500'
      })
    } else {
      updateExpense(changeExpense)
      toast({
        variant: "default",
        title: "Alterações feitas com sucesso.",
        duration: 3000,
        className: 'border-2 border-green-500'
      })
      setOpen(prev => !prev)
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="w-80 sm:w-[400px]">
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle>Alterar Despesa</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Label htmlFor="name" className="text-left w-full font-semibold">
                Título
              </Label>
              <Input
                id="name"
                type="string"
                defaultValue={changeExpense.name}
                onChange={(e) => setChangeExpense({ ...changeExpense, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col items-center gap-4">
              <Label htmlFor="username" className="text-left w-full font-semibold">
                Valor
              </Label>
              <MaskedCurrencyInput value={changeExpense.value} onChange={(e) => setChangeExpense({ ...changeExpense, value: e })} />
            </div>
            <div className="flex flex-col items-center gap-4">
              <Label htmlFor="username" className="text-left w-full font-semibold">
                Data
              </Label>
              <Input
                id="data"
                type="Date"
                defaultValue={changeExpense.date}
                onChange={(e) => setChangeExpense({ ...changeExpense, date: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-1 sm:gap-2">
              <Button type="button" variant='outline' onClick={() => setOpen(prev => !prev)} className="w-full">Cancelar</Button>
              <Button type="submit" onClick={() => changeData()} className="w-full">Salvar</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}