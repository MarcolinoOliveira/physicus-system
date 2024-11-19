"use client"

import { EllipsisVertical, SquareX, PencilLine, ShieldBan, ShieldCheck } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { Button } from '../ui/button';
import { userProps } from '@/app/types/globalTypes';
import { ChangeUserData } from '../modals/ChangeUserDataModal';
import { AlertModalDelete } from '../modals/AlertModalDelete';
import { AlertModalDesable } from '../modals/AlertModalDesable';
import { ActiveStudentModal } from '../modals/ActiveStudentModal';

type SubMenuUserProps = {
  student: userProps
}

export function SubMenuUser({ student }: SubMenuUserProps) {

  const [openChangeUser, setOpenChangeUser] = useState<boolean>(false)
  const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false)
  const [openActiveUser, setOpenActiveUser] = useState<boolean>(false)
  const [openDesableUser, setOpenDesableUser] = useState<boolean>(false)

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size='icon'><EllipsisVertical className='w-7 h-7' /></Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto flex p-0 border-border items-start" align='end'>
          <div className='flex flex-col w-full p-2 gap-2'>
            {student.status != "Desativado" &&
              <Button variant='outline' onClick={() => setOpenChangeUser(prev => !prev)}>
                <PencilLine className='mr-5' />
                <p className=''>Alterar</p>
              </Button>}
            {student.status === 'Desativado' &&
              <Button variant='outline' onClick={() => setOpenActiveUser(prev => !prev)}>
                <ShieldCheck className='mr-5' />
                <p className=''>Ativar</p>
              </Button>}
            {student.status != 'Desativado' &&
              <Button variant='outline' onClick={() => setOpenDesableUser(prev => !prev)}>
                <ShieldBan className='mr-2' />
                <p className=''>Desativar</p>
              </Button>}
            <Button variant='outline' onClick={() => setOpenDeleteUser(prev => !prev)}>
              <SquareX className="text-red-500 w-7 h-7 mr-5" />
              <p className=''>Deletar</p>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <ActiveStudentModal student={student} open={openActiveUser} setOpen={setOpenActiveUser} />
      <AlertModalDesable id={student.id} open={openDesableUser} setOpen={setOpenDesableUser} />
      <ChangeUserData student={student} open={openChangeUser} setOpen={setOpenChangeUser} />
      <AlertModalDelete id={student.id} open={openDeleteUser} setOpen={setOpenDeleteUser} />
    </div>
  )
}