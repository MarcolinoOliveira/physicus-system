'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Dispatch, SetStateAction, useState } from "react"
import MaskedCurrencyInput from "../masks/MaskCurrencyInput"
import { Checkbox } from "../ui/checkbox"
import { paymentProps } from "@/app/types/globalTypes"
import { updatePaymentManual } from "@/app/firebase/updateDocs"
import useStudents from "@/hooks/useStudents"


type PaymentCLient = {
  id: string
  idSec: string
  open: boolean
  value: string
  setOpen: Dispatch<SetStateAction<boolean>>
}

type paymentMethodProps = {
  pix: boolean,
  dinheiro: boolean,
  cartao: boolean
}

export function ChangePaymentModal({ id, idSec, open, value, setOpen }: PaymentCLient) {

  const { toast } = useToast()
  const { payments } = useStudents()

  const [student, setStudent] = useState<paymentProps>({
    value: '',
    datePayment: '',
    paymentMethod: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<paymentMethodProps>({
    pix: false,
    dinheiro: false,
    cartao: false
  })

  const handlePaymentMethod = (method: string) => {
    if (method === 'Pix') {
      setPaymentMethod({ pix: true, dinheiro: false, cartao: false })
      setStudent({ ...student, paymentMethod: method })
    }
    if (method === 'Dinheiro') {
      setPaymentMethod({ pix: false, dinheiro: true, cartao: false })
      setStudent({ ...student, paymentMethod: method })
    }
    if (method === 'Cartao') {
      setPaymentMethod({ pix: false, dinheiro: false, cartao: true })
      setStudent({ ...student, paymentMethod: method })
    }
  }

  const addPayment = () => {
    const [year, month] = student.datePayment.split('-')
    let totalValue = 0
    let idMonth = ''

    for (let i = 0; i < payments.length; i++) {
      const [yearPayment, monthPayment] = payments[i].id?.split('-')

      if (parseInt(year) === parseInt(yearPayment) && parseInt(month) === parseInt(monthPayment)) {
        totalValue += (payments[i].totalValue)
        idMonth = payments[i].id
        break
      }
    }

    if (`${year}-${month}` === idMonth) {
      updatePaymentManual(id, idSec, student, totalValue, idMonth, value)
      toast({
        variant: "default",
        title: "Dados Alterados com sucesso.",
        duration: 3000,
        className: 'border border-green-500 text-green-500'
      })
      setStudent({ value: '', datePayment: '', paymentMethod: '' })
      setPaymentMethod({ pix: false, dinheiro: false, cartao: false })
      setOpen(prev => !prev)
    } else {
      toast({
        variant: "default",
        title: "Não pode alterar para meses diferentes.",
        duration: 3000,
        className: 'border border-red-500 text-red-500'
      })
    }
  }

  const cancelarPayment = () => {
    setStudent({ value: '', datePayment: '', paymentMethod: '' })
    setPaymentMethod({ pix: false, dinheiro: false, cartao: false })
    setOpen(prev => !prev)
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Alterar mensalidade</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="name" className="text-left font-semibold">
              Valor da mensalidade
            </Label>
            <MaskedCurrencyInput value={student.value} onChange={(e) => setStudent({ ...student, value: e })} />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Data do pagamento
            </Label>
            <Input
              id="date"
              className="col-span-3"
              type="Date"
              onChange={(e) => setStudent({ ...student, datePayment: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username" className="text-left font-semibold">
              Forma de pagamento
            </Label>
            <div className="flex gap-6">
              <div className="flex gap-2 items-center justify-center">
                <Checkbox id="pix" onClick={() => handlePaymentMethod('Pix')} checked={paymentMethod.pix} />
                <Label htmlFor="username" className="text-left font-semibold">
                  Pix
                </Label>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <Checkbox id="dinehiro" onClick={() => handlePaymentMethod('Dinheiro')} checked={paymentMethod.dinheiro} />
                <Label htmlFor="username" className="text-left font-semibold">
                  Dinheiro
                </Label>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <Checkbox id="cartao" onClick={() => handlePaymentMethod('Cartao')} checked={paymentMethod.cartao} />
                <Label htmlFor="username" className="text-left font-semibold">
                  Cartão
                </Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2 justify-end">
          <Button type="button" variant='outline' onClick={cancelarPayment}>Cancelar</Button>
          <Button type="submit" onClick={() => addPayment()}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}