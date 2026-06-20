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
