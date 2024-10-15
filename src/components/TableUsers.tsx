'use client'

import { CSSProperties, useEffect, useState } from "react"
import { Input } from "./ui/input"
import { AddClient } from "./modals/AddUserModal"
import { dateFormatterPTBR } from "@/lib/dateFormatter"
import { updateDocs } from "@/app/firebase/updateDocs"
import { getDocs } from "@/app/firebase/getDocs"
import { userProps } from "@/app/types/globalTypes"
import { ChangeUserData } from "./modals/ChangeUserDataModal"
import { AlertModalDelete } from "./modals/AlertModalDelete"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList } from "react-window"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"


type rowListUsersProps = {
  index: number,
  style: CSSProperties
}

export default function TableUsers() {
  const router = useRouter()

  const [students, setStudents] = useState<userProps[]>([])
  const [search, setSearch] = useState<string>("")
  const [newDate, setNewDate] = useState<string>("")

  useEffect(() => {
    setNewDate(dateFormatterPTBR(new Date))
  }, [new Date])

  useEffect(() => {
    getDocs({ setStudents })
  }, [])

  useEffect(() => {
    if (students) {
      for (let i = 0; i < students.length; i++) {
        updateDocs(students[i].id, students[i].maturity)
      }
    }
  }, [students, newDate])

  const searchstudents = students?.filter(aluno => aluno.name.toLowerCase().includes(search.toLowerCase())
    || aluno.status?.toLowerCase().includes(search.toLowerCase()))

  const rowListUsers = ({ index, style }: rowListUsersProps) => {

    const e = searchstudents[index]

    return (
      <div key={index} style={style} className={`flex w-full h-auto border-b border-border ${index % 2 === 0 ? 'bg-border' : 'bg-accent'}`}>
        <div className="flex flex-1 justify-between items-center p-3">
          <div className="flex w-2/4 items-center justify-start">
            <p className="text-[17px] font-semibold" >{e?.name}</p>
          </div>
          <div className="flex w-1/4 items-center justify-center">
            <p className="text-[17px] font-semibold">{e?.telephone}</p>
          </div>
          <div className="flex w-1/6 items-center justify-center">
            <p className="text-[17px] font-semibold">{e?.maturity.split('-').reverse().join('/')}</p>
          </div>
          <div className="flex w-1/6 items-center justify-center">
            <div className={`flex ${e.status === 'OK' ? 'bg-green-400' : 'bg-red-500'} w-3/5 p-1 rounded-xl justify-center`}>
              <p className="text-[17px] font-semibold">{e?.status}</p>
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
    <div className="w-auto rounded-lg h-[51vh]">
      <div className="flex justify-between items-center py-5">
        <form className="flex items-center gap-2">
          <Input placeholder="Pesquisar.." className="w-auto text-[15px]" onChange={(e) => setSearch(e.target.value)} />
        </form>
        <AddClient />
      </div>
      <div className="flex w-full h-auto bg-primary rounded-t-lg justify-between p-3">
        <div className="flex flex-1 justify-between items-center mr-3">
          <div className="flex w-2/4 items-center justify-start">
            <p className="text-[17px] font-bold text-white" >Nome</p>
          </div>
          <div className="flex w-1/4 items-center justify-center">
            <p className="font-bold text-white">Telefone</p>
          </div>
          <div className="flex w-1/6 items-center justify-center">
            <p className="font-bold text-white">Vencimento</p>
          </div>
          <div className="flex w-1/6 items-center justify-center">
            <p className="font-bold text-white">Status</p>
          </div>
        </div>
        <div className="flex w-[18%] items-center justify-center">
          <p className="font-bold text-white">Total de alunos: {students.length}</p>
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