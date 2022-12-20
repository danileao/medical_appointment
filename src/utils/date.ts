import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

// Validar o horário de atendimento

// Validar se o horário de término é maior que horário de início

export function validateTime(time: string) {
  // 99:99
  return dayjs(formatDateHour(time)).isValid()
}

export function formatDateHour(time: string) {
  const date = dayjs().format('YYYY-MM-DD ') //2022-12-25
  const dateTimeFormat = new Date(`${date} ${time}`) // 2022-12-25 23:55
  return dayjs(dateTimeFormat)
}

export function compareEndTimeIsAfter(startTime: string, endTime: string) {
  return formatDateHour(endTime).isAfter(formatDateHour(startTime))
}

export function getDayOfWeek(date: string) {
  return dayjs(date).day()
}

export function formatDate(date: Date, format: string) {
  return dayjs(date).format(format)
}

export function formatDateUTC(date: Date, format: string) {
  return dayjs(date).utc().format(format)
}

export function dateToString(date: Date) {
  return dayjs(date).format('YYYY-MM-DD').toString()
}

export function toDate(date: Date) {
  return dayjs(date).toDate()
}
