'use client'

import { formatCurrentMonth } from "@/lib/dateFormatter"
import { SquareArrowLeft, SquareArrowRight } from 'lucide-react';

type InfoAreaProps = {
  currentMonth: string
  handlePrevMonth: () => void
  handleNextMonth: () => void
  totalRevenue: number
  totalValueMonth: number
  totalExpense: number
}

export function InfoArea({ currentMonth, handleNextMonth, handlePrevMonth, totalRevenue, totalValueMonth, totalExpense }: InfoAreaProps) {

  const balanco = totalValueMonth - totalExpense

  return (
    <div className="block lg:flex lg:justify-between w-full p-4 border-t-2 border-border rounded-lg shadow-md shadow-slate-600">
      <div className="flex items-center justify-center gap-10 w-full lg:w-1/3 py-4 lg:py-2">
        <div onClick={handlePrevMonth} className="cursor-pointer ">
          <SquareArrowLeft className="text-primary hover:text-blue-300 w-8 h-8" />
        </div>
        <div>
          <p className="font-bold">{formatCurrentMonth(currentMonth)}</p>
        </div>
        <div onClick={handleNextMonth} className="cursor-pointer ">
          <SquareArrowRight className="text-primary hover:text-blue-300 w-8 h-8" />
        </div>
      </div>
      <div className="block sm:flex w-full ">
        <div className="flex w-full items-center py-4 lg:py-2">
          <div className="flex flex-col items-center justify-center gap-2 w-2/4">
            <p className="font-semibold text-chart-1">Reçeita Total</p>
            <p className="font-bold text-xl">{totalRevenue?.toLocaleString('en-US', { style: 'currency', currency: 'BRL' })}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-2/4">
            <p className="font-semibold text-chart-1">Total Recebido</p>
            <p className="font-bold text-xl">{totalValueMonth?.toLocaleString('en-US', { style: 'currency', currency: 'BRL' })}</p>
          </div>
        </div>
        <div className="flex w-full items-center py-4 lg:py-2">
          <div className="flex flex-col items-center justify-center gap-2 w-2/4">
            <p className="font-semibold text-chart-1">Despesas</p>
            <p className="font-bold text-xl">{totalExpense?.toLocaleString('en-US', { style: 'currency', currency: 'BRL' })}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-2/4">
            <p className="font-semibold text-chart-1">Balanço</p>
            <p className={`${balanco >= 0 ? 'text-green-500' : 'text-red-500'} font-bold text-xl`}>
              {balanco?.toLocaleString('en-US', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}