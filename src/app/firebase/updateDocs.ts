import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { activeStudentProps, expenseProps, paymentProps, userProps } from "../types/globalTypes";


export async function updateUserManual(student: userProps) {

  if (student != undefined) {
    const docRef = doc(db, 'Alunos', student.id)

    const payload = {
      name: student.name,
      telephone: student.telephone,
      maturity: student.maturity,
      monthly: student.monthly
    }
    await updateDoc(docRef, payload)
  }
}

export async function updatePaymentManual(id: string, idSec: string, student: paymentProps, totalValue: number, idMonth: string, value: string) {
  if (id && idSec && idMonth) {
    const docRef = doc(db, `Alunos/${id}/Meses`, idSec)
    const monthsRef = doc(db, 'Pagamentos', idMonth)

    const newTotalValue = totalValue + (parseFloat(value?.replace(/R\$\s?|/g, '').replace(',', '.'))) -
      (parseFloat(student.value?.replace(/R\$\s?|/g, '').replace(',', '.')))

    const payload = {
      datePayment: student.datePayment,
      valuePayment: student.value,
      paymentMethod: student.paymentMethod
    }

    const payloadPayment = {
      totalValue: newTotalValue
    }

    await updateDoc(docRef, payload)
    await updateDoc(monthsRef, payloadPayment)
  }
}

export async function updateExpense(expense: expenseProps) {
  if (expense) {
    const docRef = doc(db, 'Despesas', expense.id)

    const payload = {
      name: expense.name,
      value: expense.value,
      date: expense.date
    }

    await updateDoc(docRef, payload)
  }
}

export async function activeStudentUpdate(student: activeStudentProps) {
  if (student.id) {
    const ref = doc(db, 'Alunos', student.id)

    const payload = {
      status: 'Ativado',
      maturity: student.maturity,
      monthly: student.monthly
    }

    await updateDoc(ref, payload)
  }
}

export async function desableStudentUpdate(id: string) {
  if (id) {
    const ref = doc(db, 'Alunos', id)

    const payload = {
      status: 'Desativado'
    }

    await updateDoc(ref, payload)
  }
}