/** Converte Firestore Timestamp | Date | string em Date (ou null). */
export function toDate(value) {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value.toDate === 'function') return value.toDate() // Firestore Timestamp
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

/** True se a data (Timestamp | Date | string) já passou. */
export function isPast(value) {
  const date = toDate(value)
  return date ? date.getTime() < Date.now() : false
}

/** Hora relativa curta, ex.: "hoje 09:12", "ontem 14:30", "12 jul 10:08". */
export function formatRelativeTime(value) {
  const date = toDate(value)
  if (!date) return ''
  const now = new Date()
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  if (date.toDateString() === now.toDateString()) return `hoje ${time}`
  if (date.toDateString() === yesterday.toDateString()) return `ontem ${time}`

  const dayMonth = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(date)
  return `${dayMonth} ${time}`
}

/** Data curta "dia mês", ex.: "15 jul". */
export function formatShortDate(value) {
  const date = toDate(value)
  if (!date) return '—'
  const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' })
    .format(date)
    .replace('.', '')
  return `${date.getDate()} ${month}`
}

/** Formata data e hora em pt-BR, ex.: "sex., 27 de jun. de 2025, 12:30". */
export function formatDateTime(value) {
  const date = toDate(value)
  if (!date) return ''
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
