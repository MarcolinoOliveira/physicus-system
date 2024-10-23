'use client'

import { getOnlyStudent, getOnlyStudentPayments } from "@/app/firebase/getDocs"
import { dataStudentPaymentProps } from "@/app/types/globalTypes"
import { useEffect, useState } from "react"
import { PaymentClientModal } from "../modals/PaymentModal"
import { DocumentData } from "firebase/firestore"
import { formatCurrentMonth } from "@/lib/dateFormatter"
import { SubMenuPayment } from "../subMenuPayment"


type OnlyStudentProps = {
  id: string
}

export function OnlyStudent({ id }: OnlyStudentProps) {

  const [student, setStudent] = useState<DocumentData>()
  const [studentPayments, setStudentPayments] = useState<dataStudentPaymentProps[]>([])

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
          <div key={key} className="flex flex-col px-6 py-4 rounded-xl border border-slate-400 w-[307px] h-[225px]">
            <div className="flex w-full items-center justify-between py-3 border-b">
              <p></p>
              <p className="font-semibold">{formatCurrentMonth(e.maturity)}</p>
              <SubMenuPayment
                id={id}
                idSec={e.id}
                maturity={e.maturity}
                datePayment={e.datePayment}
                currentMaturity={student?.maturity}
                value={e.valuePayment}
              />
            </div>
            <div className="flex flex-col justify-start w-full gap-1 pt-4">
              <div className="flex justify-between">
                <p className="font-semibold">Vencimento:</p>
                <p className="font-bold">{e.maturity.split('-').reverse().join('/')}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Pagamento: </p>
                <p className="font-bold">{e.datePayment.split('-').reverse().join('/')}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Forma do pagamento:</p>
                <p className="font-bold">{e.paymentMethod}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Valor:</p>
                <p className="font-bold">{e.valuePayment}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col px-6 py-4 rounded-xl border border-slate-400 w-[307px] h-[225px]">
          <div className="flex w-full items-center justify-center py-5 border-b">
            <p className="font-semibold">{formatCurrentMonth(student?.maturity)}</p>
          </div>
          <div className="flex flex-col justify-start w-full gap-1 pt-4">
            <div className="flex justify-between">
              <p className="font-semibold">Vencimento:</p>
              <p className="font-bold">{student?.maturity.split('-').reverse().join('/')}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Pagamento:</p>
              <p className="font-semibold">__/__/____</p>
            </div>
          </div>
          <div className="flex items-center pt-4">
            <PaymentClientModal id={id} maturity={student?.maturity} />
          </div>
        </div>
      </div>
    </div>
  )
}