"use client"

import { EllipsisVertical, SquareX, PencilLine } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { Button } from '../ui/button';
import { expenseProps } from '@/app/types/globalTypes';
import { ChangeExpenseModal } from '../modals/CHangeExpenseModal';
import { DeleteExpenseModal } from '../modals/DeleteExpenseModal';


type SubMenuExpenseProps = {
  expense: expenseProps
}

export function SubMenuExpense({ expense }: SubMenuExpenseProps) {

  const [openExpense, setOpenExpense] = useState<boolean>(false)
  const [openDeleteExpense, setOpenDeleteExpense] = useState<boolean>(false)

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size='icon'><EllipsisVertical className='w-7 h-7' /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto flex flex-col gap-2 lg:gap-0 p-1 lg:p-0 border-border items-start" align='end'>
          <div className='flex sm:hidden p-2 gap-2 w-full'>
            <p className='font-semibold'>Data:</p>
            <p className='font-semibold'>{expense.date?.split('-').reverse().join('/')}</p>
          </div>
          <div className='flex sm:flex-col w-full justify-between p-2 gap-2'>
            <Button variant='outline' onClick={() => setOpenExpense(prev => !prev)}>
              <PencilLine className='mr-0 lg:mr-3' />
              <p className='hidden sm:flex'>Alterar</p>
            </Button>
            <Button variant='outline' onClick={() => setOpenDeleteExpense(prev => !prev)}>
              <SquareX className="text-red-500 w-7 h-7 mr-0 lg:mr-3" />
              <p className='hidden sm:flex'>Deletar</p>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <ChangeExpenseModal expense={expense} open={openExpense} setOpen={setOpenExpense} />
      <DeleteExpenseModal id={expense.id} open={openDeleteExpense} setOpen={setOpenDeleteExpense} />
    </div>
  )
}