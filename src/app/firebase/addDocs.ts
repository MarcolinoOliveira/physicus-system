import { formatIdPaymentMonth, getNewMaturity } from "@/lib/dateFormatter";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { expenseProps, paymentProps, userProps } from "../types/globalTypes";

export async function addUser(student: userProps) {
  if (student != undefined) {
    const docRef = collection(db, 'Alunos')

    const payload = {
      name: student.name,
      telephone: student.telephone,
      maturity: student.maturity,
      monthly: student.monthly
    }
    await addDoc(docRef, payload)
  }
}

export async function addPaymentUser(
  id: string,
  idSec: string,
  student: paymentProps,
  maturity: string,
  totalValue: number
) {
  if (id != undefined) {
    const docRef = doc(db, 'Alunos', id)
    const collectionRef = collection(db, `Alunos/${id}/Meses/`)

    const newMaturity = getNewMaturity(maturity)
    const newTotalValue = (totalValue) + parseFloat(student.value?.replace(/R\$\s?|/g, '').replace(',', '.'))

    const payload = {
      maturity: newMaturity.split('/').reverse().join('-'),
    }

    const payloadMonth = {
      datePayment: student.datePayment,
      maturity: maturity,
      valuePayment: student.value,
      paymentMethod: student.paymentMethod
    }

    const payloadPayment = {
      dateMonth: student.datePayment,
      totalValue: newTotalValue,
    }

    await updateDoc(docRef, payload)
    await addDoc(collectionRef, payloadMonth)

    if (idSec === '') {
      const id = formatIdPaymentMonth(student.datePayment)
      const refPayment = doc(db, 'Pagamentos', id)
      await setDoc(refPayment, payloadPayment)
    } else {
      const docUpdatePayment = doc(db, 'Pagamentos', idSec)
      await updateDoc(docUpdatePayment, payloadPayment)
    }
  }
}

export async function addExpense(expense: expenseProps) {
  if (!expense) return

  const ref = collection(db, 'Despesas')

  const payload = {
    name: expense.name,
    value: expense.value,
    date: expense.date
  }

  await addDoc(ref, payload)
}