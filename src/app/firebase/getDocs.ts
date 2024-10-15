import { db } from "@/lib/firebase"
import { collection, doc, DocumentData, onSnapshot, orderBy, query } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { dataStudentPaymentProps, paymentMonthsProps, userProps } from "../types/globalTypes"

type getDocsProps = {
  setStudents: Dispatch<SetStateAction<userProps[]>>
}

type getMonthsPaymentProps = {
  setPaymentMonths: Dispatch<SetStateAction<paymentMonthsProps[]>>
}

type getOnlyStudentProps = {
  id: string,
  setStudent: Dispatch<SetStateAction<DocumentData>>
}

type getOnlyStudentPaymentsProps = {
  id: string,
  setStudentPayments: Dispatch<SetStateAction<dataStudentPaymentProps[]>>
}

export async function getDocs({ setStudents }: getDocsProps) {
  const ref = collection(db, 'Alunos')

  onSnapshot(query(ref, orderBy('name')), (snapshot) => {
    const dataStudents = snapshot.docs.map((doc) => ({ ...doc.data() as userProps, id: doc.id }))
    setStudents(dataStudents)
  })
}

export async function getMonthsPayment({ setPaymentMonths }: getMonthsPaymentProps) {
  const ref = collection(db, 'Pagamentos')

  onSnapshot(query(ref), (snapshot) => {
    const dataPayments = snapshot.docs.map((doc) => ({ ...doc.data() as paymentMonthsProps }))
    setPaymentMonths(dataPayments)
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