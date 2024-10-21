'use client'

import { useEffect, useState } from "react"
import { filterPaymentByMonth, TotalRevenueEnterprise, getCurrentMonth, filterExpenseByMonth, filterListExpenseByMonth } from "@/lib/dateFormatter"
import { expenseProps } from "@/app/types/globalTypes"
import { InfoArea } from "./InfoArea"
import { TableExpense } from "./TableExpense"
import useStudents from "@/hooks/useStudents"


export function FinanceArea() {

  const { students, payments, expenses } = useStudents()

  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [totalValueMonth, setTotalvalueMonth] = useState<number>(0)
  const [totalRevenue, setTotalRevenue] = useState<number>(0)
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const [newListExpense, setNewListexpense] = useState<expenseProps[]>([])

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
    if (!students) return

    const paymentBymonths = filterPaymentByMonth(payments, currentMonth)
    const revenueEnterprise = TotalRevenueEnterprise(students)
    const expenseByMonth = filterExpenseByMonth(expenses, currentMonth)
    const newListExpense = filterListExpenseByMonth(expenses, currentMonth)

    setTotalvalueMonth(paymentBymonths)
    setTotalRevenue(revenueEnterprise)
    setTotalExpense(expenseByMonth)
    setNewListexpense(newListExpense)

  }, [currentMonth, expenses])

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <InfoArea
        currentMonth={currentMonth}
        handleNextMonth={handleNextMonth}
        handlePrevMonth={handlePrevMonth}
        totalRevenue={totalRevenue}
        totalValueMonth={totalValueMonth}
        totalExpense={totalExpense}
      />
      <TableExpense list={newListExpense} />
    </div>
  )
}