const projectDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const projectYearFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatProjectYear(date: string) {
  return projectYearFormatter.format(new Date(date))
}

export function formatProjectPeriod(startDate?: string | null, endDate?: string | null) {
  if (!startDate) return null

  const start = projectDateFormatter.format(new Date(startDate))
  return endDate ? `${start} — ${projectDateFormatter.format(new Date(endDate))}` : start
}