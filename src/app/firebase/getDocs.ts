import { db } from "@/lib/firebase"
import { collection, doc, DocumentData, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { dataStudentPaymentProps, expenseProps, userProps, totalPaymentsByMonths } from "../types/globalTypes"
import { getDaysLate } from "@/lib/dateFormatter"
import { updateStatus } from "./updateDocs"

type getDocsProps = {
  setStudents: Dispatch<SetStateAction<userProps[]>>
}

type getMonthsPaymentProps = {
  setPayments: Dispatch<SetStateAction<totalPaymentsByMonths[]>>
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

  // const data = await getDocs(ref)
  // setStudents(data.docs.map((doc) => ({ ...doc.data() as userProps, id: doc.id })))

  onSnapshot(query(ref, orderBy('name')), (snapshot) => {
    const dataStudents = snapshot.docs.map((doc) => {
      const { name, maturity, monthly, telephone } = doc.data() as userProps

      const newDaysLater = getDaysLate(maturity)
      const status = newDaysLater <= 0 ? 'OK' : 'Vencido'

      const id = doc.id

      return { id, name, maturity, monthly, telephone, status }
    })
    setStudents(dataStudents)
  })
}

export async function getMonthsPayment({ setPayments }: getMonthsPaymentProps) {
  const ref = collection(db, 'Pagamentos')

  onSnapshot(query(ref), (snapshot) => {
    const dataPayments = snapshot.docs.map((doc) => ({ ...doc.data() as totalPaymentsByMonths, id: doc.id }))
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