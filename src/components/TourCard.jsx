import { Box, Chip, Paper, Typography } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import EventIcon from '@mui/icons-material/Event'
import { formatDateTime } from '../utils/date'
import { colors } from '../theme/tokens'

/** Cartão de exibição de um tour (restaurante, número, data). */
export default function TourCard({ tour }) {
  const { restaurant } = tour

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'rgba(255,248,236,.04)',
        border: '1px solid rgba(232,220,200,.12)',
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          height: 160,
          position: 'relative',
          background: restaurant?.photoUrl
            ? `center / cover no-repeat url(${restaurant.photoUrl})`
            : 'linear-gradient(135deg, #2a1f0a 0%, #4a3010 50%, #6b4c1a 100%)',
        }}
      >
        <Chip
          label={`🐝 Tour #${tour.tourNumber}`}
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: colors.amber,
            color: colors.cocoa,
            fontWeight: 700,
          }}
        />
      </Box>

      <Box sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ color: colors.cream, mb: 1 }}>
          {restaurant?.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <EventIcon fontSize="small" sx={{ color: colors.amber }} />
          <Typography variant="body2" sx={{ color: colors.sand }}>
            {formatDateTime(tour.eventAt)}
          </Typography>
        </Box>

        {restaurant?.address && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PlaceIcon fontSize="small" sx={{ color: colors.amber }} />
            <Typography variant="body2" sx={{ color: colors.muted }}>
              {restaurant.address}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
