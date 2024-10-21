import { db } from "@/lib/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export async function deleteUser(id: string) {
  if (id) {
    const ref = doc(db, 'Alunos', id)

    await deleteDoc(ref)
  }
}

export async function deletePayment(id: string, idSec: string, maturity: string) {
  if (id && idSec) {
    const docRef = doc(db, `Alunos/${id}/Meses`, idSec)
    const monthRef = doc(db, 'Pagamentos', idSec)
    const ref = doc(db, 'Alunos', id)

    const payload = {
      maturity: maturity
    }

    await deleteDoc(docRef)
    await deleteDoc(monthRef)
    await updateDoc(ref, payload)
  }
}

export async function deleteExpense(id: string) {
  if (id) {
    const ref = doc(db, 'Despesas', id)

    await deleteDoc(ref)
  }
}