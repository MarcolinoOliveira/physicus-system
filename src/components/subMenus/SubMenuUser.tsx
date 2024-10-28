"use client"

import { EllipsisVertical, SquareX, PencilLine } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { Button } from '../ui/button';
import { userProps } from '@/app/types/globalTypes';
import { ChangeUserData } from '../modals/ChangeUserDataModal';
import { AlertModalDelete } from '../modals/AlertModalDelete';
import Link from 'next/link';

type SubMenuUserProps = {
  student: userProps
}

export function SubMenuUser({ student }: SubMenuUserProps) {

  const [openChangeUser, setOpenChangeUser] = useState<boolean>(false)
  const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false)

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size='icon'><EllipsisVertical className='w-7 h-7' /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto flex flex-col gap-2 lg:gap-0 p-1 lg:p-0 border-border items-start" align='end'>
          <div className='flex lg:hidden flex-col p-2 gap-2 w-full'>
            <div className='flex sm:hidden w-full justify-between'>
              <p className='font-semibold'>Vencimento:</p>
              <p className='font-semibold'>{student?.maturity.split('-').reverse().join('/')}</p>
            </div>
            <div className='flex lg:hidden w-full justify-between'>
              <p className='font-semibold'>Telefone:</p>
              <p className='font-semibold'>{student.telephone}</p>
            </div>
            <div className='flex lg:hidden w-full justify-between'>
              <p className='font-semibold'>Mensalidade:</p>
              <p className='font-semibold'>{student.monthly}</p>
            </div>
          </div>
          <div className='flex lg:flex-col w-full justify-between p-2 gap-2'>
            <Link href={`/onlyStudent/${student.id}`}>
              <Button className='w-full xl:hidden'>
                Pagamentos
              </Button>
            </Link>
            <Button variant='outline' onClick={() => setOpenChangeUser(prev => !prev)}>
              <PencilLine className='mr-0 lg:mr-3' />
              <p className='hidden lg:flex'>Alterar</p>
            </Button>
            <Button variant='outline' onClick={() => setOpenDeleteUser(prev => !prev)}>
              <SquareX className="text-red-500 w-7 h-7 mr-0 lg:mr-3" />
              <p className='hidden lg:flex'>Deletar</p>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <ChangeUserData student={student} open={openChangeUser} setOpen={setOpenChangeUser} />
      <AlertModalDelete id={student.id} open={openDeleteUser} setOpen={setOpenDeleteUser} />
    </div>
  )
}