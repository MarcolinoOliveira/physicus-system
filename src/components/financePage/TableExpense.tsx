'use client'

import { expenseProps } from "@/app/types/globalTypes"
import { AddExpense } from "../modals/AddExpense"
import { DeleteExpenseModal } from "../modals/DeleteExpenseModal";
import { ChangeExpenseModal } from "../modals/CHangeExpenseModal";
import { SubMenuExpense } from "../subMenus/SubMenuExpense";


type TableExpenseProps = {
  list: expenseProps[]
}

export function TableExpense({ list }: TableExpenseProps) {


  return (
    <div className="flex flex-col w-full border-t-2 border-border rounded-lg shadow-md shadow-slate-600 px-4">
      <div className="flex items-center justify-between border-b-2 border-border py-4">
        <p className="hidden sm:flex items-center justify-center w-1/6 font-bold">Data</p>
        <p className="flex justify-start flex-1 font-bold">Título</p>
        <p className="flex justify-center w-2/6 font-bold">Valor</p>
        <div className="flex justify-end w-[15%]">
          <AddExpense />
        </div>
      </div>
      {list?.map((e, key) => (
        <div key={key} className="flex items-center justify-between py-4">
          <p className="hidden sm:flex justify-center w-1/6 font-bold">{e.date.split('-').reverse().join('/')}</p>
          <p className="flex flex-1 justify-start font-bold">{e.name}</p>
          <p className="flex justify-center w-2/6 font-bold text-red-500">{e.value}</p>
          <div className="flex w-[15%] justify-end">
            <SubMenuExpense expense={e} />
          </div>
        </div>
      ))}
    </div>
  )
}