import { db } from "@/lib/firebase"
import { collection, doc, DocumentData, onSnapshot, orderBy, query } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { dataStudentPaymentProps, expenseProps, paymentMonthsProps, userProps } from "../types/globalTypes"
import { getDaysLate } from "@/lib/dateFormatter"

type getDocsProps = {
  setStudents: Dispatch<SetStateAction<userProps[]>>
}

type getMonthsPaymentProps = {
  setPayments: Dispatch<SetStateAction<paymentMonthsProps[]>>
}

type getOnlyStudentProps = {
  id: string,
  setStudent: Dispatch<SetStateAction<DocumentData>>
}

type getOnlyStudentPaymentsProps = {
  id: string,
  setStudentPayments: Dispatch<SetStateAction<dataStudentPaymentProps[]>>
}


export async function getStudents({ setStudents }: getDocsProps) {
  const ref = collection(db, 'Alunos')

  onSnapshot(query(ref, orderBy('name')), (snapshot) => {
    const dataStudents = snapshot.docs.map((doc) => {
      const { name, maturity, monthly, telephone } = doc.data() as userProps

      const newDaysLater = getDaysLate(maturity)
      const newStatus = newDaysLater <= 0 ? 'OK' : 'Vencido'

      const id = doc.id
      const status = newStatus
      return { id, name, maturity, monthly, telephone, status }

    })
    setStudents(dataStudents)
  })
}

export async function getMonthsPayment({ setPayments }: getMonthsPaymentProps) {
  const ref = collection(db, 'Pagamentos')

  onSnapshot(query(ref), (snapshot) => {
    const dataPayments = snapshot.docs.map((doc) => ({ ...doc.data() as paymentMonthsProps }))
    setPayments(dataPayments)
  })
}

export async function getOnlyStudent({ id, setStudent }: getOnlyStudentProps) {
  if (!id) return

  const docRef = doc(db, 'Alunos', id)

  onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      setStudent(doc.data());
    }
  });
}

export async function getOnlyStudentPayments({ id, setStudentPayments }: getOnlyStudentPaymentsProps) {
  const ref = collection(db, `Alunos/${id}/Meses`)

  onSnapshot(query(ref, orderBy('maturity')), (snapshot) => {
    const dataStudent = snapshot.docs.map((doc) => ({ ...doc.data() as dataStudentPaymentProps, id: doc.id }))
    setStudentPayments(dataStudent)
  })
}

export async function getListExpense(setListExpense: Dispatch<SetStateAction<expenseProps[]>>) {
  const ref = collection(db, 'Despesas')

  onSnapshot(query(ref, orderBy('date')), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ ...doc.data() as expenseProps, id: doc.id }))
    setListExpense(data)
  })
}