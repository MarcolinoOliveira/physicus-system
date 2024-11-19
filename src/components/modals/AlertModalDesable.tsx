'use client'

import { desableStudentUpdate } from "@/app/firebase/updateDocs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Dispatch, SetStateAction } from "react";

type AlertModalDesableProps = {
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function AlertModalDesable({ id, open, setOpen }: AlertModalDesableProps) {
  const { toast } = useToast()

  const handleDesableUser = () => {
    desableStudentUpdate(id)
    toast({
      variant: "default",
      title: "Cliente desativado com sucesso.",
      duration: 3000,
      className: 'border-2 border-green-500'
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
      <AlertDialogContent className="w-80">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação desativará seu aluno da sua lista
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex gap-2 items-center w-full">
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDesableUser} className="w-full mt-2 sm:mt-0">Continue</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}