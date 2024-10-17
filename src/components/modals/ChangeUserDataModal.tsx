'use client'

import { userProps } from "@/app/types/globalTypes"
import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { updateUserManual } from "@/app/firebase/updateDocs"
import { useToast } from "@/hooks/use-toast"
import MaskedCurrencyInput from "../masks/MaskCurrencyInput"
import MaskedTelephoneInput from "../masks/MaskTelephoneInput"
import { PencilLine } from 'lucide-react';

type changeUserDataProps = {
  student: userProps
}

export function ChangeUserData({ student }: changeUserDataProps) {
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
        className: 'border border-red-500 text-red-500'
      })
    } else {
      updateUserManual(changeUser)
      toast({
        variant: "default",
        title: "Alterações feitas com sucesso.",
        duration: 3000,
        className: 'border border-green-500 text-green-500'
      })
      setChangeUser({ id: '', name: '', telephone: '', maturity: '', status: '', monthly: '' })
    }
  }

  const cancelarChangeData = () => {
    setChangeUser({ id: '', name: '', telephone: '', maturity: '', status: '', monthly: '' })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <PencilLine className="w-7 h-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Alterar dados</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="name" className="text-left font-semibold">
              Nome Completo
            </Label>
            <Input
              id="name"
              type="string"
              defaultValue={changeUser.name}
              onChange={(e) => setChangeUser({ ...changeUser, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Número do Celular
            </Label>
            <MaskedTelephoneInput value={changeUser.telephone} onChange={(e) => setChangeUser({ ...student, telephone: e })} />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Mensalidade
            </Label>
            <MaskedCurrencyInput value={changeUser.monthly} onChange={(e) => setChangeUser({ ...student, monthly: e })} />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Vencimento
            </Label>
            <Input
              id="data"
              type="Date"
              defaultValue={changeUser.maturity}
              onChange={(e) => setChangeUser({ ...changeUser, maturity: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose>
            <Button type="button" variant='outline' onClick={cancelarChangeData} className="mr-2">Cancelar</Button>
            <Button type="submit" onClick={() => changeData()}>Salvar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}