import { dateFormatterPTBR, getDaysLate } from "@/lib/dateFormatter";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { paymentProps, userProps } from "../types/globalTypes";

export async function updateDocs(id: string, maturity: string) {
  if (id) {
    const ref = doc(db, 'Alunos', id)
    const newDate = new Date

    const newDaysLater = getDaysLate(maturity)
    const newStatus = newDaysLater >= 1 ? 'Vencido' : 'OK'

    const payload = {
      currentDate: dateFormatterPTBR(newDate),
      status: newStatus
    }

    await updateDoc(ref, payload)
  }
}

export async function updateUserManual(student: userProps) {

  if (student != undefined) {
    const docRef = doc(db, 'Alunos', student.id)
    const daysRef = getDaysLate(dateFormatterPTBR(new Date(student.maturity)))
    const statusRef = daysRef >= 0 ? 'Vencido' : 'OK'

    const payload = {
      name: student.name,
      telephone: student.telephone,
      maturity: student.maturity,
      status: statusRef,
      currentDate: dateFormatterPTBR(new Date),
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