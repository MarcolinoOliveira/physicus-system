import { getNewMaturity } from "@/lib/dateFormatter";
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

export async function addPaymentUser(id: string, student: paymentProps, maturity: string) {
  if (id != undefined) {

    const docRef = doc(db, 'Alunos', id)
    const idSec = Math.random()
    const collectionRef = doc(db, `Alunos/${id}/Meses/`, idSec.toString())
    const docPaymentRef = doc(db, 'Pagamentos', idSec.toString())

    const newMaturity = getNewMaturity(maturity)

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
      datePayment: student.datePayment,
      maturity: maturity,
      valuePayment: student.value,
      paymentMethod: student.paymentMethod
    }

    await updateDoc(docRef, payload)
    await setDoc(collectionRef, payloadMonth)
    await setDoc(docPaymentRef, payloadPayment)
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