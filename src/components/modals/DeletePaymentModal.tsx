'use client'

import { deletePayment } from "@/app/firebase/deleteDocs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Dispatch, SetStateAction } from "react";

type AlertModalDeleteProps = {
  id: string
  idSec: string
  maturity: string
  currentMaturity: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function DeletePaymentModal({ id, idSec, maturity, currentMaturity, open, setOpen }: AlertModalDeleteProps) {
  const { toast } = useToast()

  const handleDeleteUser = () => {
    const [year, month] = maturity.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1, 1)
    date.setMonth(date.getMonth() + 1)

    const currentDate = new Date(currentMaturity)

    if (date.getMonth() === currentDate.getMonth()) {
      deletePayment(id, idSec, maturity)
      toast({
        variant: "default",
        title: "Mensalidade excluido com sucesso.",
        duration: 3000,
        className: 'border border-green-500 text-green-500'
      })
      setOpen(prev => !prev)
    } else {
      toast({
        variant: "destructive",
        title: "Exclua se forma decrescente.",
        duration: 3000,
        className: 'border border-red-500 text-red-500'
      })
      setOpen(prev => !prev)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente seu
            aluno e removera seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteUser} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}