import { paymentMonthsProps, userProps } from "@/app/types/globalTypes";


export const dateFormatterPTBR = (date: Date, locale = 'pt-BR') => {
  return new Intl.DateTimeFormat(locale).format(date)
}

export const getNewMaturity = (maturity: string) => {
  const newDate: Date = new Date(maturity.split('/').reverse().join('-'))
  newDate.setDate(newDate.getDate() + 1);
  newDate.setMonth(newDate.getMonth() + 1);

  const opcoes: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formatador = new Intl.DateTimeFormat('pt-BR', opcoes);

  return formatador.format(newDate)
}

export const getLastMaturity = (maturity: string) => {
  const newDate: Date = new Date(maturity.split('/').reverse().join('-'))
  newDate.setDate(newDate.getDate() - 1);
  newDate.setMonth(newDate.getMonth() - 1);

  const opcoes: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formatador = new Intl.DateTimeFormat('pt-BR', opcoes);

  return formatador.format(newDate)
}

export const getDaysLate = (maturity: string) => {
  const date = new Date()
  const dateBR = dateFormatterPTBR(date)

  const inicio: any = new Date(maturity.split('/').reverse().join('-'));
  const fim: any = new Date(dateBR.split('/').reverse().join('-'));

  const diferenca = fim - inicio
  const dias = diferenca / (1000 * 60 * 60 * 24);

  return dias;
}

export const getCurrentMonth = () => {
  let now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

export const getPaymentMonth = (date: string) => {
  const newDate = new Date(date.split('/').reverse().join('-'))
  return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate() + 1}`;
}

export const filterPaymentByMonthToReceive = (aluno: userProps[], date: string) => {
  const [year, month] = date?.split('-')
  let total = 0

  for (let i = 0; i < aluno?.length; i++) {
    const newDate = new Date(aluno[i].maturity)

    if (newDate.getFullYear() === parseInt(year) && (newDate.getMonth() + 1) === parseInt(month)) {
      total += parseFloat(aluno[i].monthly.replace(/R\$\s?|/g, '').replace(',', '.'))
    }
  }

  return total
}

export const filterPaymentByMonth = (payments: paymentMonthsProps[], date: string) => {
  const [year, month] = date?.split('-')
  let total = 0

  for (let i = 0; i < payments?.length; i++) {
    const newDate = new Date(payments[i].datePayment)

    if (newDate.getFullYear() === parseInt(year) && (newDate.getMonth() + 1) === parseInt(month)) {
      total += parseFloat(payments[i].valuePayment.replace(/R\$\s?|/g, '').replace(',', '.'))
    }
  }

  return total
}

export const formatCurrentMonth = (currentMonth: string) => {
  if (!currentMonth) return
  const [year, month] = currentMonth.split('-')
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  return `${months[parseInt(month) - 1]} de ${year}`;
}