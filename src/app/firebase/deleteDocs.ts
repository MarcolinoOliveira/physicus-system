import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

type deleteUserProps = {
  id: string
  setSpin: Dispatch<SetStateAction<boolean>>
}

export async function deleteUser({ id, setSpin }: deleteUserProps) {
  if (id) {
    const ref = doc(db, 'Alunos', id)
    const refMonth = collection(db, `Alunos/${id}/Meses`)

    const data = await getDocs(refMonth)
    const res = data.docs.map((doc) => ({ id: doc.id }))

    if (res[0]?.id) {
      res.map(async (e) => {
        const ref = doc(db, `Alunos/${id}/Meses`, e.id)
        await deleteDoc(ref)
      })
    }

    await deleteDoc(ref)
    setSpin(prev => !prev)
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