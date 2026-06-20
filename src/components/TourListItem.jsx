import { Avatar, Box, Chip, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { formatDateTime, isPast } from '../utils/date'

/** Linha compacta de um tour para listagens (admin). */
export default function TourListItem({ tour }) {
  const past = isPast(tour.eventAt)

  return (
    <ListItem divider sx={{ alignItems: 'flex-start' }}>
      <ListItemAvatar>
        <Avatar src={tour.restaurant?.photoUrl || undefined} variant="rounded">
          <RestaurantIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography component="span" sx={{ fontWeight: 600 }}>
              Tour #{tour.tourNumber} — {tour.restaurant?.name}
            </Typography>
            <Chip
              size="small"
              label={past ? 'Realizado' : 'Agendado'}
              color={past ? 'default' : 'primary'}
              variant={past ? 'outlined' : 'filled'}
            />
          </Box>
        }
        secondary={
          <Typography component="span" variant="body2" color="text.secondary">
            {formatDateTime(tour.eventAt)} · {tour.restaurant?.address}
          </Typography>
        }
      />
    </ListItem>
  )
}
