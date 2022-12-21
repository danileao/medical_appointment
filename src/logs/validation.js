const dayjs = require('dayjs')

const startAt = ' 09:12'
const endAt = ' 08:12'

// console.log(validateTime(startAt))

function validateTime(hour) {
  return dayjs(formatDateHour(hour)).isValid()
}

function formatDateHour(hour) {
  const date = dayjs().format('YYYY-MM-DD ')
  const dateTimeFormat = new Date(`${date} ${hour}`)
  return dayjs(dateTimeFormat)
}

console.log(formatDateHour(endAt).isAfter(formatDateHour(startAt)))
