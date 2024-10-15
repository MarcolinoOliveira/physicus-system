'use client'

import { getMonthsPayment, getOnlyStudent, getOnlyStudentPayments } from "@/app/firebase/getDocs"
import { dataStudentPaymentProps, paymentMonthsProps } from "@/app/types/globalTypes"
import { useEffect, useState } from "react"
import { PaymentClientModal } from "../modals/PaymentModal"
import { DocumentData } from "firebase/firestore"
import { formatCurrentMonth } from "@/lib/dateFormatter"
import { ChangePaymentModal } from "../modals/ChangePaymentModal"
import { DeletePaymentModal } from "../modals/DeletePaymentModal"


type OnlyStudentProps = {
  id: string
}

export function OnlyStudent({ id }: OnlyStudentProps) {

  const [paymentMonths, setPaymentMonths] = useState<paymentMonthsProps[]>([])
  const [student, setStudent] = useState<DocumentData>()
  const [studentPayments, setStudentPayments] = useState<dataStudentPaymentProps[]>([])

  useEffect(() => {
    getMonthsPayment({ setPaymentMonths })
  }, [])

  useEffect(() => {
    getOnlyStudent({ id, setStudent })
  }, [id, studentPayments])

  useEffect(() => {
    getOnlyStudentPayments({ id, setStudentPayments })
  }, [])

  return (
    <div className="flex flex-col max-w-7xl">
      <div className="flex w-full items-center justify-center pb-10">
        <p className="font-bold text-3xl">{student?.name}</p>
      </div>
      <div className="flex gap-3 overflow-y-auto flex-wrap h-[65vh]">
        {studentPayments?.map((e, key) => (
          <div key={key} className="flex flex-col px-6 py-4 rounded-xl border border-slate-400 w-[307px] h-[215px]">
            <div className="flex w-full items-center justify-center py-2 border-b">
              <p className="font-semibold">{formatCurrentMonth(e.maturity)}</p>
            </div>
            <div className="flex flex-col justify-start w-full gap-1 pt-4">
              <p className="font-semibold">Vencimento: {e.maturity.split('-').reverse().join('/')}</p>
              <p className="font-semibold">Pagamento: {e.datePayment.split('-').reverse().join('/')}</p>
              <p className="font-semibold">Forma do pagamento: {e.paymentMethod}</p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="font-semibold">Valor: {e.valuePayment}</p>
              </div>
              <div className="flex gap-2">
                <ChangePaymentModal id={id} idSec={e.id} />
                <DeletePaymentModal id={id} idSec={e.id} maturity={e.maturity} currentMaturity={student?.maturity} />
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col px-6 py-4 rounded-xl border border-slate-400 w-[307px] h-[215px]">
          <div className="flex w-full items-center justify-center py-2 border-b">
            <p className="font-semibold">{formatCurrentMonth(student?.maturity)}</p>
          </div>
          <div className="flex flex-col justify-start w-full gap-1 pt-4">
            <p className="font-semibold">Vencimento: {student?.maturity.split('-').reverse().join('/')}</p>
            <p className="font-semibold">Pagamento: __/__/____</p>
            <p className="font-semibold">Forma do pagamento:</p>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="font-semibold">Valor: </p>
            </div>
            <div className="flex gap-2">
              <PaymentClientModal id={id} maturity={student?.maturity} countId={paymentMonths?.length + 1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}