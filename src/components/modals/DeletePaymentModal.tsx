'use client'

import { deletePayment } from "@/app/firebase/deleteDocs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { SquareX } from 'lucide-react';
import { Button } from "../ui/button";

type AlertModalDeleteProps = {
  id: string
  idSec: string
  maturity: string
  currentMaturity: string
}

export function DeletePaymentModal({ id, idSec, maturity, currentMaturity }: AlertModalDeleteProps) {
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
      })

    } else {
      toast({
        variant: "destructive",
        title: "Exclua se forma decrescente.",
        duration: 3000,
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <SquareX className="text-red-500 hover:text-red-800 w-7 h-7" />
        </Button>
      </AlertDialogTrigger>
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