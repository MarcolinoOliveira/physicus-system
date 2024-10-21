'use client'

import { expenseProps, paymentMonthsProps, userProps } from "@/app/types/globalTypes"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

type StudentsDataContextProps = {
  students: userProps[]
  payments: paymentMonthsProps[]
  expenses: expenseProps[]
  setStudents: Dispatch<SetStateAction<userProps[]>>
  setPayments: Dispatch<SetStateAction<paymentMonthsProps[]>>
  setExpenses: Dispatch<SetStateAction<expenseProps[]>>
}

const StudentsDataContext = createContext({} as StudentsDataContextProps)

export const StudentsDataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<userProps[]>([])
  const [payments, setPayments] = useState<paymentMonthsProps[]>([])
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