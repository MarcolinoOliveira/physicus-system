'use client'

import { deleteExpense } from "@/app/firebase/deleteDocs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Dispatch, SetStateAction } from "react";

type AlertModalDeleteProps = {
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function DeleteExpenseModal({ id, open, setOpen }: AlertModalDeleteProps) {
  const { toast } = useToast()

  const handleDelete = () => {
    deleteExpense(id)
    toast({
      variant: "default",
      title: "Despesa excluida com sucesso.",
      duration: 3000,
      className: 'border-2 border-green-500'
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
            despesa e removera seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex gap-2 items-center w-full">
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="w-full mt-2 sm:mt-0">Continue</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}