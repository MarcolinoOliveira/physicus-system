'use client'

import { activeStudentProps, userProps } from "@/app/types/globalTypes"
import { Dispatch, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useToast } from "@/hooks/use-toast"
import MaskedCurrencyInput from "../masks/MaskCurrencyInput"
import { activeStudentUpdate } from "@/app/firebase/updateDocs"

type ActiveStudentModalProps = {
  student: userProps
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function ActiveStudentModal({ student, open, setOpen }: ActiveStudentModalProps) {
  const { toast } = useToast()

  const [activeStudent, setActiveStudent] = useState<activeStudentProps>({
    id: student.id,
    maturity: student.maturity,
    monthly: student.monthly,
  })

  const changeData = () => {
    const [year, month, day] = activeStudent.maturity?.split('-')

    if (activeStudent?.monthly === '') {
      toast({
        variant: "default",
        title: "Valor inválido.",
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
      activeStudentUpdate(activeStudent)
      toast({
        variant: "default",
        title: "Aluno ativado com sucesso.",
        duration: 3000,
        className: 'border-2 border-green-500'
      })
      setOpen(prev => !prev)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
      <DialogContent className="w-80 sm:max-w-[400px]">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Alterar dados</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
              Mensalidade
            </Label>
            <MaskedCurrencyInput value={activeStudent.monthly} onChange={(e) => setActiveStudent({ ...student, monthly: e })} />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
              Vencimento
            </Label>
            <Input
              id="data"
              type="Date"
              defaultValue={student.maturity}
              onChange={(e) => setActiveStudent({ ...activeStudent, maturity: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full gap-1 sm:gap-2">
            <Button type="button" variant='outline' onClick={() => setOpen(prev => !prev)} className="w-full">Cancelar</Button>
            <Button type="submit" onClick={() => changeData()} className="w-full">Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}