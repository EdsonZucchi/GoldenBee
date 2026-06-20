import { useCallback, useEffect, useState } from 'react'
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import StarIcon from '@mui/icons-material/Star'
import EventIcon from '@mui/icons-material/Event'
import PlaceIcon from '@mui/icons-material/Place'
import { useAuth } from '../context/AuthContext'
import { tourService } from '../service/tourService'
import { isPast, formatDateTime, formatShortDate, formatRelativeTime } from '../utils/date'
import { computeNextTour } from '../utils/tour'
import { initials, colorFromString } from '../utils/avatar'
import StatCard from '../components/StatCard'
import NewTourDialog from '../components/NewTourDialog'
import TourDetailsDialog from '../components/TourDetailsDialog'
import EmptyState from '../components/common/EmptyState'
import { colors } from '../theme/tokens'

function TourRow({ tour, participants, selected, onClick }) {
  const past = isPast(tour.eventAt)
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        bgcolor: 'rgba(255,248,236,.04)',
        border: `1px solid ${selected ? 'rgba(245,166,35,.45)' : 'rgba(232,220,200,.1)'}`,
        transition: 'border-color .2s',
        '&:hover': { borderColor: 'rgba(245,166,35,.35)' },
      }}
    >
      <Chip
        label={`#${tour.tourNumber}`}
        size="small"
        sx={{ bgcolor: 'rgba(245,166,35,.12)', color: colors.amber, fontWeight: 700 }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: colors.cream }} noWrap>
          {tour.restaurant?.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: colors.muted, minWidth: 0 }}>
          <EventIcon sx={{ fontSize: '0.95rem' }} />
          <Typography variant="body2" sx={{ color: 'inherit' }} noWrap>
            {formatDateTime(tour.eventAt)}
          </Typography>
          {tour.restaurant?.address && (
            <>
              <PlaceIcon sx={{ fontSize: '0.95rem', ml: 0.5 }} />
              <Typography variant="body2" sx={{ color: 'inherit' }} noWrap>
                {tour.restaurant.address}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {participants.length > 0 && (
        <AvatarGroup
          max={4}
          sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '.7rem', border: `2px solid ${colors.charcoal}` } }}
        >
          {participants.map((p) => (
            <Avatar key={p.uid} sx={{ bgcolor: colorFromString(p.name) }}>
              {initials(p.name)}
            </Avatar>
          ))}
        </AvatarGroup>
      )}

      <Chip
        size="small"
        variant="outlined"
        label={past ? 'Realizado' : 'Confirmações abertas'}
        sx={{
          color: past ? colors.muted : colors.amber,
          borderColor: past ? 'rgba(232,220,200,.2)' : 'rgba(245,166,35,.4)',
        }}
      />
    </Paper>
  )
}

export default function ToursPage() {
  const { isAdmin } = useAuth()
  const [tours, setTours] = useState([])
  const [participantsByTour, setParticipantsByTour] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newOpen, setNewOpen] = useState(false)
  const [detailsTour, setDetailsTour] = useState(null)
  const [success, setSuccess] = useState(false)

  const fetchData = useCallback(async () => {
    const list = await tourService.listTours()
    const entries = await Promise.all(
      list.map(async (t) => [t.id, await tourService.listParticipants(t.id).catch(() => [])]),
    )
    return { list, map: Object.fromEntries(entries) }
  }, [])

  const applyData = useCallback(({ list, map }) => {
    setTours(list)
    setParticipantsByTour(map)
    setSelectedId((prev) =>
      prev && list.some((t) => t.id === prev) ? prev : computeNextTour(list)?.id ?? list[0]?.id ?? null,
    )
  }, [])

  useEffect(() => {
    let active = true
    fetchData()
      .then((data) => {
        if (!active) return
        applyData(data)
        setLoading(false)
      })
      .catch(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [fetchData, applyData])

  async function reload() {
    setLoading(true)
    try {
      applyData(await fetchData())
    } finally {
      setLoading(false)
    }
  }

  const nextTour = computeNextTour(tours)
  const upcomingCount = tours.filter((t) => !isPast(t.eventAt)).length
  const pastCount = tours.filter((t) => isPast(t.eventAt)).length
  const selectedTour = tours.find((t) => t.id === selectedId) || null
  const selectedParticipants = participantsByTour[selectedId] || []
  const nextConfirmed = nextTour ? (participantsByTour[nextTour.id] || []).length : 0

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Tours Gastronômicos
          </Typography>
          <Typography color="text.secondary">
            Gerencie agendamentos e confirmações
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip
            label={`${upcomingCount} ${upcomingCount === 1 ? 'tour ativo' : 'tours ativos'}`}
            variant="outlined"
            sx={{ color: colors.amber, borderColor: 'rgba(245,166,35,.4)' }}
          />
          {isAdmin && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setNewOpen(true)}>
              Novo tour
            </Button>
          )}
        </Box>
      </Box>

      {/* Stat cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
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
        <StatCard label="Confirmados" value={nextConfirmed} hint="no próximo tour" />
        <StatCard label="Tours realizados" value={pastCount} hint="no total" />
        <StatCard
          label="Avaliação média"
          value={<Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>—<StarIcon sx={{ color: colors.amber, fontSize: '1.5rem' }} /></Box>}
          hint="em breve"
        />
      </Box>

      {/* Lista de tours */}
      <Typography variant="overline" color="primary">
        Agendamentos
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Tours
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      ) : tours.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {tours.map((tour) => (
            <TourRow
              key={tour.id}
              tour={tour}
              participants={participantsByTour[tour.id] || []}
              selected={tour.id === selectedId}
              onClick={() => setSelectedId(tour.id)}
            />
          ))}
        </Box>
      ) : (
        <EmptyState
          icon="🗓️"
          title="Nenhum tour cadastrado"
          message={isAdmin ? 'Use o botão "Novo tour" para começar.' : 'Aguarde o próximo tour ser agendado.'}
        />
      )}

      {/* Confirmações do tour selecionado */}
      {selectedTour && (
        <Box sx={{ mt: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Box>
              <Typography variant="overline" color="primary">
                Tour #{selectedTour.tourNumber}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Confirmações — {selectedTour.restaurant?.name}
              </Typography>
            </Box>
            <Button variant="outlined" onClick={() => setDetailsTour(selectedTour)}>
              Ver detalhes completos
            </Button>
          </Box>

          <Paper
            elevation={0}
            sx={{ bgcolor: 'rgba(255,248,236,.03)', border: '1px solid rgba(232,220,200,.1)', borderRadius: 2, overflowX: 'auto' }}
          >
            {selectedParticipants.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: colors.muted, borderColor: 'rgba(232,220,200,.1)' }}>Participante</TableCell>
                    <TableCell sx={{ color: colors.muted, borderColor: 'rgba(232,220,200,.1)' }}>Confirmação</TableCell>
                    <TableCell sx={{ color: colors.muted, borderColor: 'rgba(232,220,200,.1)' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedParticipants.map((p) => (
                    <TableRow key={p.uid}>
                      <TableCell sx={{ borderColor: 'rgba(232,220,200,.06)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 34, height: 34, fontSize: '.8rem', bgcolor: colorFromString(p.name) }}>
                            {initials(p.name)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ color: colors.cream, fontWeight: 600 }}>
                              {p.name}
                            </Typography>
                            {p.email && (
                              <Typography variant="caption" sx={{ color: colors.muted }}>
                                {p.email}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: colors.sand, borderColor: 'rgba(232,220,200,.06)' }}>
                        {formatRelativeTime(p.confirmedAt) || '—'}
                      </TableCell>
                      <TableCell sx={{ borderColor: 'rgba(232,220,200,.06)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4caf50' }} />
                          <Typography variant="body2" sx={{ color: colors.cream }}>
                            Confirmado
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Box sx={{ p: 4 }}>
                <Typography variant="body2" sx={{ color: colors.muted, textAlign: 'center' }}>
                  Ninguém confirmou presença neste tour ainda.
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      )}

      {/* Botão flutuante: detalhes do tour selecionado */}
      {selectedTour && (
        <Button
          variant="contained"
          onClick={() => setDetailsTour(selectedTour)}
          sx={{ position: 'fixed', bottom: 24, right: 24, boxShadow: 6 }}
        >
          Ver Tour #{selectedTour.tourNumber}
        </Button>
      )}

      <NewTourDialog
        open={newOpen}
        onClose={() => setNewOpen(false)}
        onCreated={() => {
          setSuccess(true)
          reload()
        }}
      />
      <TourDetailsDialog
        open={!!detailsTour}
        onClose={() => setDetailsTour(null)}
        tour={detailsTour}
      />

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Tour cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  )
}
