'use client'

import { deleteExpense } from "@/app/firebase/deleteDocs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { SquareX } from 'lucide-react';
import { Button } from "../ui/button";

type AlertModalDeleteProps = {
  id: string
}

export function DeleteExpenseModal({ id }: AlertModalDeleteProps) {
  const { toast } = useToast()

  const handleDelete = () => {
    deleteExpense(id)
    toast({
      variant: "default",
      title: "Despesa excluida com sucesso.",
      duration: 3000,
      className: 'border border-green-500 text-green-500'
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='icon' variant='ghost'>
          <SquareX className="text-red-500 w-7 h-7" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
            despesa e removera seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}