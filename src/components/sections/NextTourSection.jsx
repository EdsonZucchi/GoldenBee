import { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import SectionShell from '../common/SectionShell'
import EmptyState from '../common/EmptyState'
import TourCard from '../TourCard'
import { tourService } from '../../service/tourService'

/** Seção "Próximo tour agendado" da landing — busca o próximo tour real. */
export default function NextTourSection() {
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    tourService
      .getNextTour()
      .then((next) => active && setTour(next))
      .catch(() => active && setTour(null))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return (
    <SectionShell id="tour" label="em breve" title="Próximo tour agendado">
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : tour ? (
        <Box sx={{ maxWidth: 520 }}>
          <TourCard tour={tour} />
        </Box>
      ) : (
        <EmptyState
          icon="🗓️"
          title="Nenhum tour confirmado ainda"
          message="Assim que um próximo tour for agendado, ele aparecerá aqui com data, local e participantes confirmados."
        />
      )}
    </SectionShell>
  )
}
