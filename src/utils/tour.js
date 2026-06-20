import { isPast } from './date'

/**
 * Próximo tour (o mais cedo entre os futuros).
 * A lista de tours vem ordenada por data do evento em ordem decrescente,
 * então o próximo é o último entre os que ainda não ocorreram.
 */
export function computeNextTour(tours = []) {
  const upcoming = tours.filter((t) => !isPast(t.eventAt))
  return upcoming.length ? upcoming[upcoming.length - 1] : null
}
