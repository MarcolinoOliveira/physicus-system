'use client'

import { deleteUser } from "@/app/firebase/deleteDocs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type AlertModalDeleteProps = {
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function AlertModalDelete({ id, open, setOpen }: AlertModalDeleteProps) {
  const { toast } = useToast()
  const [spin, setSpin] = useState<boolean>(false)

  const handleDeleteUser = () => {
    setSpin(prev => !prev)
    deleteUser({ id, setSpin })
    toast({
      variant: "default",
      title: "Cliente excluido com sucesso.",
      duration: 3000,
      className: 'border-2 border-green-500'
    })
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
          <div className="flex gap-2 items-center w-full">
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="w-full mt-2 sm:mt-0">
              {spin && <LoaderCircle className="animate-spin" />}
              {!spin && <p>Continue</p>}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}