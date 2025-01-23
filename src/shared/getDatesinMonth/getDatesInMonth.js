export function getDatesInMonth(year, month) {
  const date = new Date(year, month - 1, 1);

  const dates = []

  while (date.getMonth() === month - 1) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return dates
}