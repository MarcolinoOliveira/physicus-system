'use client'

import { CSSProperties, useState } from "react"
import { Input } from "./ui/input"
import { AddClient } from "./modals/AddUserModal"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList } from "react-window"
import { Button } from "./ui/button"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { CircleDollarSign } from 'lucide-react';
import { toast } from "@/hooks/use-toast"
import useStudents from "@/hooks/useStudents"
import { SubMenuUser } from "./subMenus/SubMenuUser"
import { userProps } from "@/app/types/globalTypes"
import { getDesableStudents } from "@/app/firebase/getDocs"
import { SubMenuActive } from "./subMenus/SubMenuActive"


type rowListUsersProps = {
  index: number,
  style: CSSProperties
}

export default function TableUsers() {

  const { students } = useStudents()

  const [search, setSearch] = useState<string>("")
  const [desableStudents, setDesableStudents] = useState<userProps[]>([])
  const [statusStudent, setStatusStudent] = useState<string>("Ativados")

  const [user] = useAuthState(auth)
  const router = useRouter()

  const admin = 'bruno@physicus.com'

  const searchstudents = students?.filter(aluno => aluno.name.toLowerCase().includes(search.toLowerCase())
    || aluno.status?.toLowerCase().includes(search.toLowerCase()))

  const handleRouter = () => {
    if (user?.email === admin) {
      router.push('financeiro')
    } else {
      toast({
        variant: "default",
        title: 'Usuário sem acesso',
        duration: 3000,
        className: 'border-2 border-red-500'
      })
    }
  }

  const handleShowDesableStudents = () => {
    getDesableStudents({ setDesableStudents })
    setStatusStudent("Desativados")
  }

  const rowListUsers = ({ index, style }: rowListUsersProps) => {

    const e = statusStudent === "Ativados" ? searchstudents[index] : desableStudents[index]

    return (
      <div key={index} style={style} className={`flex w-full border-b border-border ${index % 2 === 0 ? 'bg-border' : 'bg-accent'}`}>
        <div className="flex flex-1 items-center p-3">
          <div className="flex flex-1 flex-col">
            <div className="flex w-full justify-start items-center">
              <Link href={`/onlyStudent/${e.id}`}>
                <p className="text-[17px] font-semibold hover:text-primary hover:underline" >{e?.name}</p>
              </Link>
            </div>
            {statusStudent === "Ativados" &&
              <div className="flex lg:hidden gap-2">
                <p className="text-[13px] text-slate-400 font-semibold">{e?.maturity.split('-').reverse().join('/')}</p>
                <p className="text-[13px] text-slate-400 font-semibold">{e?.telephone}</p>
                <p className="text-[13px] text-slate-400 font-semibold">{e?.monthly}</p>
              </div>}
          </div>
          <div className="hidden lg:flex w-[20%] items-center justify-center">
            <p className="text-[17px] font-semibold">{e?.telephone}</p>
          </div>
          <div className="hidden lg:flex w-[15%] items-center justify-center">
            <p className="text-[17px] font-semibold">{e?.monthly}</p>
          </div>
          <div className="hidden lg:flex w-[18%] items-center justify-center">
            <p className="text-[17px] font-semibold">{e?.maturity.split('-').reverse().join('/')}</p>
          </div>
          {statusStudent === "Ativados" &&
            <div className={`flex ${e.status === 'OK' ? 'bg-green-500' : 'bg-red-500'} 
                          w-[16%] sm:w-[15%] p-1 rounded-xl justify-center`}>
              <p className="flex lg:hidden text-[17px] font-semibold text-white">{e.status === 'Vencido' ? "Venc." : e.status}</p>
              <p className="hidden lg:flex text-[17px] font-semibold text-white">{e.status === 'Vencido' ? "Vencido" : e.status}</p>
            </div>}
          {statusStudent === "Desativados" &&
            <div className="flex justify-center bg-slate-500 w-[31%] rounded-xl">
              <p className="font-semibold text-white">{e.status}</p>
            </div>}
        </div>
        <div className="flex justify-center items-center gap-3 w-[12%] lg:w-[5%]">
          <SubMenuUser student={e} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-auto rounded-lg h-[66vh] sm:h-[59vh] mt-32 sm:mt-0">
      <div className="flex justify-between items-center py-5">
        <form className="flex items-center gap-2">
          <Input placeholder="Pesquisar.." className="text-[15px]" onChange={(e) => setSearch(e.target.value)} />
        </form>
        <div className="flex gap-2">
          <Button onClick={handleRouter} variant="default" className="flex gap-2 font-semibold">
            <CircleDollarSign />
            <p className="hidden sm:flex">Finançeiro</p>
          </Button>
          <AddClient />
        </div>
      </div>
      <div className="flex w-full h-auto bg-primary rounded-t-lg justify-between py-3">
        <div className="flex flex-1 justify-between items-center mr-3">
          <div className="flex flex-1 items-center justify-start">
            <SubMenuActive statusStudent={statusStudent} setStatusStudent={setStatusStudent} StudentsInactives={handleShowDesableStudents} />
          </div>
          <div className="hidden lg:flex w-[20%] items-center justify-center">
            <p className="font-bold text-white">Telefone</p>
          </div>
          <div className="hidden lg:flex w-[15%] items-center justify-center">
            <p className="font-bold text-white">Mensalidade</p>
          </div>
          <div className="hidden lg:flex w-[18%] items-center justify-center">
            <p className="font-bold text-white">Vencimento</p>
          </div>
          <div className="flex w-[16%] sm:w-[15%] items-center justify-center mr-1">
            <p className="font-bold text-white">Status</p>
          </div>
        </div>
        <div className="flex w-[12%] lg:w-[5%] items-center justify-center gap-1 pr-3">
          <p className="font-bold text-white">Nº</p>
          <p className="font-semibold text-white">{statusStudent === "Ativados" ? searchstudents?.length : desableStudents.length}</p>
        </div>
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemCount={statusStudent === "Ativados" ? searchstudents.length : desableStudents.length}
            itemSize={75}
          >
            {rowListUsers}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  )
}