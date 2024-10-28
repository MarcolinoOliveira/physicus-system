'use client'

import { addPaymentUser } from "@/app/firebase/addDocs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import MaskedCurrencyInput from "../masks/MaskCurrencyInput"
import { Checkbox } from "../ui/checkbox"
import { paymentProps } from "@/app/types/globalTypes"
import useStudents from "@/hooks/useStudents"

type PaymentCLient = {
  id: string
  maturity: string
}

type paymentMethodProps = {
  pix: boolean,
  dinheiro: boolean,
  cartao: boolean
}

export function PaymentClientModal({ id, maturity }: PaymentCLient) {

  const { payments } = useStudents()
  const { toast } = useToast()

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
    if (method === 'Cartão') {
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

    addPaymentUser(id, idMonth, student, maturity, totalValue)

    toast({
      variant: "default",
      title: "Pagamento Adicionado com sucesso.",
      duration: 3000,
      className: 'border-2 border-green-500'
    })
    setStudent({ value: '', datePayment: '', paymentMethod: '' })
    setPaymentMethod({ pix: false, dinheiro: false, cartao: false })
  }

  const cancelarPayment = () => {
    setStudent({ value: '', datePayment: '', paymentMethod: '' })
    setPaymentMethod({ pix: false, dinheiro: false, cartao: false })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">Receber mensalidade</Button>
      </DialogTrigger>
      <DialogContent className="w-80 sm:max-w-[350px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Receber Mensalidade</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="name" className="text-left w-full font-semibold">
              Valor da mensalidade
            </Label>
            <MaskedCurrencyInput value={student.value} onChange={(e) => setStudent({ ...student, value: e })} />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="username" className="text-left w-full font-semibold">
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
            <Label htmlFor="username" className="text-left w-full font-semibold">
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
                <Checkbox id="cartao" onClick={() => handlePaymentMethod('Cartão')} checked={paymentMethod.cartao} />
                <Label htmlFor="username" className="text-left font-semibold">
                  Cartão
                </Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <div className="w-full flex gap-2">
              <Button type="button" variant='outline' onClick={cancelarPayment} className="w-full">Cancelar</Button>
              <Button type="submit" onClick={() => addPayment()} className="w-full">Salvar</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}