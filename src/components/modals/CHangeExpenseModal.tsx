'use client'

import { expenseProps } from "@/app/types/globalTypes"
import { useState } from "react"
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
}

export function ChangeExpenseModal({ expense }: ChangeExpenseModalProps) {
  const { toast } = useToast()

  const [open, setOpen] = useState<boolean>(false)
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
        className: 'border border-red-500 text-red-500'
      })
    } else {
      updateExpense(changeExpense)
      toast({
        variant: "default",
        title: "Alterações feitas com sucesso.",
        duration: 3000,
        className: 'border border-green-500 text-green-500'
      })
      setOpen(prev => !prev)
    }
  }

  return (
    <div>
      <Button variant='ghost' size='icon' onClick={() => setOpen(prev => !prev)}>
        <PencilLine className="w-7 h-7" />
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle>Alterar Despesa</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="name" className="text-left font-semibold">
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
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="username" className="text-left font-semibold">
                Valor
              </Label>
              <MaskedCurrencyInput value={changeExpense.value} onChange={(e) => setChangeExpense({ ...changeExpense, value: e })} />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="username" className="text-left font-semibold">
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
          <DialogFooter className="gap-2">
            <Button type="button" variant='outline' onClick={() => setOpen(prev => !prev)} className="mr-2">Cancelar</Button>
            <Button type="submit" onClick={() => changeData()}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}