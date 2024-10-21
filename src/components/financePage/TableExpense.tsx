'use client'

import { expenseProps } from "@/app/types/globalTypes"
import { AddExpense } from "../modals/AddExpense"
import { DeleteExpenseModal } from "../modals/DeleteExpenseModal";
import { ChangeExpenseModal } from "../modals/CHangeExpenseModal";


type TableExpenseProps = {
  list: expenseProps[]
}

export function TableExpense({ list }: TableExpenseProps) {


  return (
    <div className="flex flex-col w-full border-t-2 border-border rounded-lg shadow-md shadow-slate-600 px-4">
      <div className="flex items-center justify-between border-b-2 border-border py-4">
        <p className="flex items-center justify-center w-1/6 font-bold">Data</p>
        <p className="flex justify-start w-2/4 font-bold">Título</p>
        <p className="flex justify-center w-1/6 font-bold">Valor</p>
        <div className="flex justify-end w-2/12">
          <AddExpense />
        </div>
      </div>
      {list?.map((e, key) => (
        <div key={key} className="flex items-center justify-between p-4">
          <p className="flex justify-center w-1/6 font-bold">{e.date.split('-').reverse().join('/')}</p>
          <p className="flex w-2/4 justify-start font-bold">{e.name}</p>
          <p className="flex justify-center w-1/6 font-bold text-red-500">{e.value}</p>
          <div className="flex w-2/12 justify-end gap-2">
            <ChangeExpenseModal expense={e} />
            <DeleteExpenseModal id={e.id} />
          </div>
        </div>
      ))}
    </div>
  )
}