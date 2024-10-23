'use client'

import { expenseProps, paymentMonthsProps, totalPaymentsByMonths, userProps } from "@/app/types/globalTypes"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

type StudentsDataContextProps = {
  students: userProps[]
  payments: totalPaymentsByMonths[]
  expenses: expenseProps[]
  setStudents: Dispatch<SetStateAction<userProps[]>>
  setPayments: Dispatch<SetStateAction<totalPaymentsByMonths[]>>
  setExpenses: Dispatch<SetStateAction<expenseProps[]>>
}

const StudentsDataContext = createContext({} as StudentsDataContextProps)

export const StudentsDataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<userProps[]>([])
  const [payments, setPayments] = useState<totalPaymentsByMonths[]>([])
  const [expenses, setExpenses] = useState<expenseProps[]>([])

  return (
    <StudentsDataContext.Provider value={{
      students,
      payments,
      expenses,
      setStudents,
      setPayments,
      setExpenses
    }}>
      {children}
    </StudentsDataContext.Provider>
  )
}

export default StudentsDataContext