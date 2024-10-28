'use client'

import { userProps } from "@/app/types/globalTypes"
import { Dispatch, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { updateUserManual } from "@/app/firebase/updateDocs"
import { useToast } from "@/hooks/use-toast"
import MaskedCurrencyInput from "../masks/MaskCurrencyInput"
import MaskedTelephoneInput from "../masks/MaskTelephoneInput"

type changeUserDataProps = {
  student: userProps
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function ChangeUserData({ student, open, setOpen }: changeUserDataProps) {
  const { toast } = useToast()

  const [changeUser, setChangeUser] = useState<userProps>({
    id: student.id,
    name: student.name,
    maturity: student.maturity,
    monthly: student.monthly,
    status: student.status,
    telephone: student.telephone
  })

  const changeData = () => {
    if (changeUser?.name === '') {
      toast({
        variant: "default",
        title: "Nome inválido.",
        duration: 3000,
        className: 'border-2 border-red-500'
      })
    } else {
      updateUserManual(changeUser)
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
    <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
      <DialogContent className="w-80 sm:max-w-[400px]">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Alterar dados</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="name" className="text-left w-full font-semibold">
              Nome Completo
            </Label>
            <Input
              id="name"
              type="string"
              defaultValue={student.name}
              onChange={(e) => setChangeUser({ ...changeUser, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
              Número do Celular
            </Label>
            <MaskedTelephoneInput value={changeUser.telephone} onChange={(e) => setChangeUser({ ...student, telephone: e })} />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
              Mensalidade
            </Label>
            <MaskedCurrencyInput value={changeUser.monthly} onChange={(e) => setChangeUser({ ...student, monthly: e })} />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
              Vencimento
            </Label>
            <Input
              id="data"
              type="Date"
              defaultValue={student.maturity}
              onChange={(e) => setChangeUser({ ...changeUser, maturity: e.target.value })}
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