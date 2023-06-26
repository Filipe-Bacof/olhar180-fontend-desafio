function generateDateWithTimestamp(timestamp: number) {
  return new Date(timestamp).toLocaleDateString()
}

function generateTimeWithTimestamp(timestamp: number) {
  const date = new Date(timestamp)
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return `${hours}:${minutes}`
}

function generateTimeAndDateWithTimestamp(timestamp: number) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month =
    date.getMonth() <= 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() <= 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return [`${year}-${month}-${day}`, `${hours}:${minutes}`]
}

function generateTimestampWithDateAndTime(date: string, time: string) {
  const dateFormated = date.split('-')
  const timeFormated = time.split(':')

  return new Date(
    Number(dateFormated[0]),
    Number(dateFormated[1]) - 1,
    // no JS os meses são contados a partir do ZERO - portanto o mês 11 é DEZEMBRO
    // os meses aqui chegam com o número equivalente, e então é subtraido 1 para ficar no formato que o JS aceita
    Number(dateFormated[2]),
    Number(timeFormated[0]),
    Number(timeFormated[1]),
  ).getTime()
}

function convertDate(dateString: string) {
  const parts = dateString.split('/')
  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

export {
  generateDateWithTimestamp,
  generateTimeWithTimestamp,
  generateTimeAndDateWithTimestamp,
  generateTimestampWithDateAndTime,
  convertDate,
}
