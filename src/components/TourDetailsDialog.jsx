import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import StarIcon from '@mui/icons-material/Star'
import EventIcon from '@mui/icons-material/Event'
import PlaceIcon from '@mui/icons-material/Place'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import CheckIcon from '@mui/icons-material/Check'
import PlaceMap from './PlaceMap'
import { useAuth } from '../context/AuthContext'
import { placesService } from '../service/placesService'
import { tourService } from '../service/tourService'
import { isGoogleMapsConfigured } from '../config/googleMaps'
import { formatDateTime, formatRelativeTime } from '../utils/date'
import { colors } from '../theme/tokens'

const darkPaperSx = {
  bgcolor: colors.charcoal,
  backgroundImage: 'none',
  border: '1px solid rgba(245,166,35,.18)',
  borderRadius: 3,
}

const HERO_GRADIENT = 'linear-gradient(135deg, #2a1f0a 0%, #4a3010 50%, #6b4c1a 100%)'

function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/** Formata os tipos do Google em um rótulo legível (ex.: "Hamburger Restaurant"). */
function formatTypes(types = []) {
  const generic = new Set([
    'point_of_interest',
    'establishment',
    'food',
    'restaurant',
  ])
  const main = types.find((t) => !generic.has(t)) || types[0]
  if (!main) return 'Restaurante'
  return main
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/** Linha de metadado no painel direito (rótulo mono + valor). */
function MetaRow({ icon, label, children }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
      <Box sx={{ color: colors.amber, mt: 0.3 }}>{icon}</Box>
      <Box>
        <Typography variant="overline" sx={{ color: colors.muted, display: 'block', lineHeight: 1.4 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.cream, fontWeight: 500 }}>
          {children}
        </Typography>
      </Box>
    </Box>
  )
}

/** Conteúdo do dialog: monta ao abrir e carrega detalhes + participantes. */
function TourDetailsBody({ tour }) {
  const { user } = useAuth()
  const [details, setDetails] = useState(null)
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [working, setWorking] = useState(false)
  const [error, setError] = useState('')

  const reloadParticipants = useCallback(async () => {
    try {
      setParticipants(await tourService.listParticipants(tour.id))
    } catch {
      /* ignora erro de releitura */
    }
  }, [tour.id])

  useEffect(() => {
    let active = true
    Promise.allSettled([
      placesService.getRestaurant(tour.placeId),
      tourService.listParticipants(tour.id),
    ]).then(([det, parts]) => {
      if (!active) return
      setDetails(det.status === 'fulfilled' ? det.value : null)
      setParticipants(parts.status === 'fulfilled' ? parts.value : [])
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [tour.placeId, tour.id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 320 }}>
        <CircularProgress />
      </Box>
    )
  }

  const place = details || tour.restaurant || {}
  const heroPhoto = place.photos?.[0] || place.photoUrl || null
  const isConfirmed = participants.some((p) => p.uid === user?.uid)

  async function togglePresence() {
    if (!user) return
    setWorking(true)
    setError('')
    try {
      if (isConfirmed) {
        await tourService.cancelPresence(tour.id, user.uid)
      } else {
        await tourService.confirmPresence(tour.id, user)
      }
      await reloadParticipants()
    } catch (err) {
      setError(err.message)
    } finally {
      setWorking(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
      }}
    >
      {/* ── Coluna esquerda: foto única + mapa ── */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Foto do lugar com overlay de informações */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 200, md: 260 },
            flexShrink: 0,
            background: heroPhoto ? `center / cover no-repeat url(${heroPhoto})` : HERO_GRADIENT,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(20,14,4,.92) 0%, rgba(20,14,4,.35) 55%, rgba(20,14,4,.15) 100%)',
            }}
          />
          <Box sx={{ position: 'relative', p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Chip
              label={`🐝 Tour #${tour.tourNumber}`}
              size="small"
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                bgcolor: colors.amber,
                color: colors.cocoa,
                fontWeight: 700,
              }}
            />
            <Typography variant="h4" sx={{ color: colors.white, fontWeight: 700, lineHeight: 1.1 }}>
              {place.name}
            </Typography>
            {place.rating != null && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.75 }}>
                <StarIcon fontSize="small" sx={{ color: colors.amber }} />
                <Typography variant="body2" sx={{ color: colors.sand }}>
                  {place.rating} · {place.ratingCount} avaliações no Google
                </Typography>
              </Box>
            )}
            {place.address && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                <PlaceIcon fontSize="small" sx={{ color: 'rgba(255,255,255,.6)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,.7)' }}>
                  {place.address}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Mapa */}
        {isGoogleMapsConfigured() && place.location ? (
          <PlaceMap location={place.location} name={place.name} height={320} />
        ) : (
          <Box
            sx={{
              height: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,.25)',
              color: colors.muted,
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">{place.address || 'Mapa indisponível'}</Typography>
          </Box>
        )}
      </Box>

      {/* ── Coluna direita: detalhes + confirmados + ações ── */}
      <Box
        sx={{
          width: { xs: '100%', md: 360 },
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: { md: '1px solid rgba(232,220,200,.1)' },
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(232,220,200,.1)' }}>
          <Typography variant="h6" sx={{ color: colors.cream }}>
            Detalhes do Tour
          </Typography>
          <Typography variant="body2" sx={{ color: colors.muted }}>
            Confirmações e informações
          </Typography>
        </Box>

        <Box sx={{ p: 3, flex: 1 }}>
          <MetaRow icon={<EventIcon fontSize="small" />} label="Data e horário">
            {formatDateTime(tour.eventAt)}
          </MetaRow>
          <MetaRow icon={<RestaurantMenuIcon fontSize="small" />} label="Tipo">
            {formatTypes(place.types)}
          </MetaRow>

          {/* Confirmados */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3, mb: 1.5 }}>
            <Typography variant="overline" sx={{ color: colors.amber }}>
              Confirmados
            </Typography>
            <Chip
              size="small"
              label={`${participants.length} confirmado${participants.length === 1 ? '' : 's'}`}
              sx={{ bgcolor: 'rgba(245,166,35,.12)', color: colors.amber }}
            />
          </Box>

          {participants.length > 0 ? (
            participants.map((p) => (
              <Box
                key={p.uid}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.25,
                  mb: 1,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255,248,236,.04)',
                  border: '1px solid rgba(232,220,200,.08)',
                }}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: colors.amberDark, fontSize: '.8rem' }}>
                  {initials(p.name)}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ color: colors.cream, fontWeight: 600 }} noWrap>
                    {p.name}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: colors.muted, whiteSpace: 'nowrap' }}>
                  {formatRelativeTime(p.confirmedAt)}
                </Typography>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4caf50' }} />
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: colors.muted }}>
              Ninguém confirmou ainda. Seja o primeiro!
            </Typography>
          )}
        </Box>

        {/* Ações */}
        <Box sx={{ p: 3, borderTop: '1px solid rgba(232,220,200,.1)' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {isConfirmed ? (
            <Button
              fullWidth
              size="large"
              variant="outlined"
              color="error"
              disabled={working}
              onClick={togglePresence}
            >
              {working ? 'Salvando...' : '✕ Cancelar presença'}
            </Button>
          ) : (
            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<CheckIcon />}
              disabled={working}
              onClick={togglePresence}
            >
              {working ? 'Salvando...' : 'Confirmar minha presença'}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

/** Dialog de detalhes de um tour (foto, mapa, confirmados, presença). */
export default function TourDetailsDialog({ open, onClose, tour }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={fullScreen}
      slotProps={{ paper: { sx: darkPaperSx } }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Fechar"
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          color: colors.cream,
          bgcolor: 'rgba(0,0,0,.35)',
          zIndex: 2,
          '&:hover': { bgcolor: 'rgba(0,0,0,.55)' },
        }}
      >
        <CloseIcon />
      </IconButton>
      {tour && <TourDetailsBody tour={tour} />}
    </Dialog>
  )
}
