import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { paymentProps, userProps } from "../types/globalTypes";


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

export async function updatePaymentManual(id: string, idSec: string, student: paymentProps) {
  if (id && idSec) {
    const docRef = doc(db, `Alunos/${id}/Meses`, idSec)
    const monthsRef = doc(db, 'Pagamentos', idSec)

    const payload = {
      datePayment: student.datePayment,
      valuePayment: student.value,
      paymentMethod: student.paymentMethod
    }

    await updateDoc(docRef, payload)
    await updateDoc(monthsRef, payload)
  }
}