import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { tourService } from '../service/tourService'
import { computeNextTour } from '../utils/tour'
import { isPast, formatShortDate } from '../utils/date'
import StatCard from '../components/StatCard'
import TourCard from '../components/TourCard'
import TourDetailsDialog from '../components/TourDetailsDialog'
import EmptyState from '../components/common/EmptyState'

export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tours, setTours] = useState([])
  const [nextParticipants, setNextParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [detailsOpen, setDetailsOpen] = useState(false)

  useEffect(() => {
    let active = true
    ;(async () => {
      const list = await tourService.listTours().catch(() => [])
      const next = computeNextTour(list)
      const parts = next ? await tourService.listParticipants(next.id).catch(() => []) : []
      if (!active) return
      setTours(list)
      setNextParticipants(parts)
      setLoading(false)
    })()
    return () => {
      active = false
    }
  }, [])

  const nextTour = computeNextTour(tours)
  const pastCount = tours.filter((t) => isPast(t.eventAt)).length
  const upcomingCount = tours.filter((t) => !isPast(t.eventAt)).length
  const firstName = (user?.displayName || '').split(' ')[0]

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Olá{firstName ? `, ${firstName}` : ''}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Sua central de tours gastronômicos.
      </Typography>

      {/* Visão geral */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 4,
        }}
      >
        <StatCard
          highlight
          label="Próximo tour"
          value={nextTour ? formatShortDate(nextTour.eventAt) : '—'}
          hint={nextTour?.restaurant?.name || 'Nenhum agendado'}
        />
        <StatCard label="Tours ativos" value={upcomingCount} hint="agendados" />
        <StatCard label="Tours realizados" value={pastCount} hint="no total" />
      </Box>

      {/* Próximo tour */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="overline" color="primary">
            Próximo tour
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Seu próximo encontro
          </Typography>
        </Box>
        <Button variant="text" onClick={() => navigate('/app/tours')}>
          Ver todos
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      ) : nextTour ? (
        <Box sx={{ maxWidth: 520 }}>
          <TourCard tour={nextTour} onClick={() => setDetailsOpen(true)} />
          {nextParticipants.length > 0 && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              {nextParticipants.length}{' '}
              {nextParticipants.length === 1 ? 'pessoa confirmada' : 'pessoas confirmadas'}
            </Typography>
          )}
        </Box>
      ) : (
        <EmptyState
          icon="🗓️"
          title="Nenhum tour agendado"
          message="Quando um novo tour for cadastrado, ele aparecerá aqui."
        />
      )}

      <TourDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        tour={nextTour}
      />
    </Box>
  )
}
