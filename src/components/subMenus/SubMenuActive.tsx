'use client'

import { Dispatch, SetStateAction } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"

interface SubMenuActiveProps {
  statusStudent: string
  StudentsInactives: () => void
  setStatusStudent: Dispatch<SetStateAction<string>>
}

export const SubMenuActive = ({ statusStudent, StudentsInactives, setStatusStudent }: SubMenuActiveProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex gap-1">
          <p className="font-bold text-base text-white">Nome /</p>
          <p className="font-bold text-base text-white">{statusStudent}</p>
          <ChevronDown className="text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto items-start p-1" align='center'>
        <PopoverClose asChild>
          <div className="flex flex-col gap-2">
            <Button onClick={() => setStatusStudent("Ativados")} className="text-white font-bold">Ativados</Button>
            <Button onClick={() => StudentsInactives()} className="text-white font-bold">Desativados</Button>
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}