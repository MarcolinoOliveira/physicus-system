"use client"

import { Button } from "@/components/ui/button"
import { ChangePaymentModal } from '../modals/ChangePaymentModal';
import { DeletePaymentModal } from '../modals/DeletePaymentModal';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { PencilLine, SquareX, EllipsisVertical } from 'lucide-react';


type AlertModalDeleteProps = {
  id: string
  idSec: string
  maturity: string
  datePayment: string
  currentMaturity: string
  value: string
}

export function SubMenuPayment({ id, idSec, maturity, datePayment, currentMaturity, value }: AlertModalDeleteProps) {
  const [openChangePayment, setOpenChangePayment] = useState<boolean>(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false)

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size='icon'><EllipsisVertical className='w-6 h-6' /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto flex flex-col gap-2 p-1 border-border">
          <Button variant="ghost" onClick={() => setOpenChangePayment(prev => !prev)}>
            <PencilLine className='w-7 h-7 mr-2' /> Alterar
          </Button>
          <Button variant="ghost" onClick={() => setOpenDeleteAlert(prev => !prev)}>
            <SquareX className='w-7 h-7 text-red-500 mr-2' /> Deletar
          </Button>
        </PopoverContent>
      </Popover>
      <ChangePaymentModal
        id={id}
        idSec={idSec}
        open={openChangePayment}
        value={value}
        setOpen={setOpenChangePayment}
      />
      <DeletePaymentModal
        id={id}
        idSec={idSec}
        maturity={maturity}
        datePayment={datePayment}
        value={value}
        currentMaturity={currentMaturity}
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
      />
    </div>
  )
}