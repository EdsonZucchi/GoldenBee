import { useEffect, useState } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { tourService } from '../service/tourService'
import TourCard from '../components/TourCard'
import EmptyState from '../components/common/EmptyState'

export default function HomePage() {
  const { user } = useAuth()
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
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Olá, {user?.displayName || 'colaborador'}! 👋
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Bem-vindo ao GoldenBee, sua central de tours gastronômicos.
      </Typography>

      <Typography variant="overline" color="primary">
        Próximo tour
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : tour ? (
        <Box sx={{ mt: 1 }}>
          <TourCard tour={tour} />
        </Box>
      ) : (
        <Box sx={{ mt: 1 }}>
          <EmptyState
            icon="🗓️"
            title="Nenhum tour agendado"
            message="Quando um novo tour for cadastrado, ele aparecerá aqui."
          />
        </Box>
      )}
    </Box>
  )
}
