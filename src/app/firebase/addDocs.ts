import { getDaysLate, dateFormatterPTBR, getNewMaturity } from "@/lib/dateFormatter";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { paymentProps, userProps } from "../types/globalTypes";

export async function addUser(student: userProps) {
  if (student != undefined) {
    const docRef = collection(db, 'Alunos')
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
    await addDoc(docRef, payload)
  }
}

export async function addPaymentUser(id: string, student: paymentProps, maturity: string, countId: number) {
  if (id != undefined) {

    const docRef = doc(db, 'Alunos', id)
    const collectionRef = doc(db, `Alunos/${id}/Meses/`, countId.toString())
    const docPaymentRef = doc(db, 'Pagamentos', countId.toString())

    const newMaturity = getNewMaturity(maturity)
    const newDaysLater = getDaysLate(newMaturity)
    const newStatus = newDaysLater >= 1 ? 'Vencido' : 'OK'

    const payload = {
      maturity: newMaturity.split('/').reverse().join('-'),
      status: newStatus
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