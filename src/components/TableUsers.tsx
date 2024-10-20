'use client'

import { CSSProperties, useState } from "react"
import { Input } from "./ui/input"
import { AddClient } from "./modals/AddUserModal"
import { ChangeUserData } from "./modals/ChangeUserDataModal"
import { AlertModalDelete } from "./modals/AlertModalDelete"
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


type rowListUsersProps = {
  index: number,
  style: CSSProperties
}

export default function TableUsers() {

  const { students } = useStudents()
  const [search, setSearch] = useState<string>("")
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
        className: 'border border-red-500 text-red-500'
      })
    }
  }

  const rowListUsers = ({ index, style }: rowListUsersProps) => {

    const e = searchstudents[index]

    return (
      <div key={index} style={style} className={`flex w-full h-auto border-b border-border ${index % 2 === 0 ? 'bg-border' : 'bg-accent'}`}>
        <div className="flex flex-1 justify-between items-center p-3">
          <div className="flex w-2/5 items-center justify-start">
            <p className="text-[17px] font-semibold" >{e?.name}</p>
          </div>
          <div className="flex w-1/5 items-center justify-center">
            <p className="text-[17px] font-semibold">{e?.telephone}</p>
          </div>
          <div className="flex w-1/5 items-center justify-center">
            <p className="text-[17px] font-semibold">{e?.monthly}</p>
          </div>
          <div className="flex w-1/6 items-center justify-center">
            <p className="text-[17px] font-semibold">{e?.maturity.split('-').reverse().join('/')}</p>
          </div>
          <div className="flex w-1/6 items-center justify-center">
            <div className={`flex ${e.status === 'OK' ? 'bg-green-400' : 'bg-red-500'} w-3/5 p-1 rounded-xl justify-center`}>
              <p className="text-[17px] font-semibold">{e.status}</p>
            </div>
          </div>
        </div>
        <div className="flex w-[18%] justify-between p-3 items-center gap-1">
          <Link href={`/onlyStudent/${e.id}`}>
            <Button>
              Pagamentos
            </Button>
          </Link>
          {<ChangeUserData student={e} />}
          {<AlertModalDelete id={e.id} />}
        </div>
      </div>
    )
  }

  return (
    <div className="w-auto rounded-lg h-[60vh]">
      <div className="flex justify-between items-center py-5">
        <form className="flex items-center gap-2">
          <Input placeholder="Pesquisar.." className="w-auto text-[15px]" onChange={(e) => setSearch(e.target.value)} />
        </form>
        <div className="flex gap-2">
          <Button onClick={handleRouter} variant="default" className="flex gap-2 font-semibold">
            <CircleDollarSign />
            Finançeiro
          </Button>
          <AddClient />
        </div>
      </div>
      <div className="flex w-full h-auto bg-primary rounded-t-lg justify-between p-3">
        <div className="flex flex-1 justify-between items-center mr-3">
          <div className="flex w-2/5 items-center justify-start">
            <p className="text-[17px] font-bold text-white" >Nome</p>
          </div>
          <div className="flex w-1/5 items-center justify-center">
            <p className="font-bold text-white">Telefone</p>
          </div>
          <div className="flex w-1/5 items-center justify-center">
            <p className="font-bold text-white">Mensalidade</p>
          </div>
          <div className="flex w-1/6 items-center justify-center">
            <p className="font-bold text-white">Vencimento</p>
          </div>
          <div className="flex w-1/6 items-center justify-center">
            <p className="font-bold text-white">Status</p>
          </div>
        </div>
        <div className="flex w-[18%] items-center justify-center">
          <p className="font-bold text-white">Total de alunos: {searchstudents?.length}</p>
        </div>
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList height={height} width={width} itemCount={searchstudents.length} itemSize={60}>
            {rowListUsers}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  )
}