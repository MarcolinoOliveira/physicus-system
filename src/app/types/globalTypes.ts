export type userProps = {
  id: string,
  name: string,
  telephone: string,
  maturity: string,
  status: string,
  monthly: string
}

export type paymentMonthsProps = {
  datePayment: string,
  maturity: string,
  valuePayment: string
}

export type dataStudentPaymentProps = {
  id: string,
  datePayment: string,
  maturity: string,
  valuePayment: string,
  paymentMethod: string,
}

export type paymentProps = {
  value: string
  datePayment: string
  paymentMethod: string
}

export type expenseProps = {
  id: string,
  name: string,
  value: string,
  date: string
}