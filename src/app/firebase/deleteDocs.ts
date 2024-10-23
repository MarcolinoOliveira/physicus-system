import { db } from "@/lib/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export async function deleteUser(id: string) {
  if (id) {
    const ref = doc(db, 'Alunos', id)

    await deleteDoc(ref)
  }
}

export async function deletePayment(id: string, idSec: string, idPayment: string, maturity: string, value: string, totalValue: number) {
  if (id && idSec) {
    const docRef = doc(db, `Alunos/${id}/Meses`, idSec)
    const monthRef = doc(db, 'Pagamentos', idPayment)
    const ref = doc(db, 'Alunos', id)

    const newTotalValue = totalValue - parseFloat(value?.replace(/R\$\s?|/g, '').replace(',', '.'))

    const payload = {
      maturity: maturity
    }

    const payloadPayment = {
      totalValue: newTotalValue
    }

    await deleteDoc(docRef)
    await updateDoc(monthRef, payloadPayment)
    await updateDoc(ref, payload)
  }
}

export async function deleteExpense(id: string) {
  if (id) {
    const ref = doc(db, 'Despesas', id)

    await deleteDoc(ref)
  }
}