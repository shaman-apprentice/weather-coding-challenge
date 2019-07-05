export function isRequestForDay(day?: string) {
  return day
    && day.match(/^\d{4}-\d{2}-\d{2}$/)
    && new Date(day).toString() !== 'invalid Date'
}

export function isRequestForMonth(month?: string) {
  return month
    && month.match(/^\d{4}-\d{2}$/)
    && new Date(month).toString() !== 'invalid Date'
}