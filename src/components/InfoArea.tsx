'use client'

import { useEffect, useState } from "react"
import { filterPaymentByMonth, filterPaymentByMonthToReceive, formatCurrentMonth, getCurrentMonth } from "@/lib/dateFormatter"
import { paymentMonthsProps, userProps } from "@/app/types/globalTypes"
import { getDocs, getMonthsPayment } from "@/app/firebase/getDocs"
import { SquareArrowLeft, SquareArrowRight } from 'lucide-react';


export function InfoArea() {

  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [students, setStudents] = useState<userProps[]>([])
  const [paymentMonths, setPaymentMonths] = useState<paymentMonthsProps[]>([])

  const [totalValueMonth, setTotalvalueMonth] = useState<number>(0)
  const [totalHaReceiveMonth, setTotalHaReceiveMonth] = useState<number>(0)

  useEffect(() => {
    getMonthsPayment({ setPaymentMonths })
    getDocs({ setStudents })
  }, [])

  const handlePrevMonth = () => {
    const [year, month] = currentMonth.split('-')
    const currentDate = new Date(parseInt(year), parseInt(month) - 1, 1)
    currentDate.setMonth(currentDate.getMonth() - 1)
    setCurrentMonth(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`)
  }

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split('-')
    const currentDate = new Date(parseInt(year), parseInt(month) - 1, 1)
    currentDate.setMonth(currentDate.getMonth() + 1)
    setCurrentMonth(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`)
  }

  useEffect(() => {
    const value = filterPaymentByMonth(paymentMonths, currentMonth)
    const haReceive = filterPaymentByMonthToReceive(students, currentMonth)

    setTotalvalueMonth(value)
    setTotalHaReceiveMonth(haReceive)

  }, [currentMonth, paymentMonths])

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center gap-10 py-4">
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
      <div className="flex gap-5">
        <div className="flex flex-col items-center justify-center border-4 rounded-xl px-6 py-3 border-primary">
          <p className="font-bold">Total Recebido</p>
          <p className="font-semibold">{totalValueMonth?.toLocaleString('en-US', { style: 'currency', currency: 'BRL' })}</p>
        </div>
        <div className="flex flex-col items-center justify-center border-4 rounded-xl px-6 py-3 border-primary">
          <p className="font-bold">Total a receber</p>
          <p className="font-semibold">{totalHaReceiveMonth?.toLocaleString('en-US', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      </div>
    </div>
  )
}