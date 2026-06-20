import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import RestaurantSearch from './RestaurantSearch'
import { tourService } from '../service/tourService'
import { colors } from '../theme/tokens'

// Card escuro (o paper padrão do tema é creme, que conflita com o texto claro).
const darkPaperSx = {
  bgcolor: colors.charcoal,
  backgroundImage: 'none',
  border: '1px solid rgba(245,166,35,.18)',
  borderRadius: 3,
}

/** Dialog (admin) para cadastrar um novo tour. */
export default function NewTourDialog({ open, onClose, onCreated }) {
  const [restaurant, setRestaurant] = useState(null)
  const [eventAt, setEventAt] = useState('') // string do input datetime-local
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function handleExited() {
    setRestaurant(null)
    setEventAt('')
    setError('')
    setSaving(false)
  }

  async function handleSubmit() {
    setError('')
    if (!restaurant) {
      setError('Selecione um restaurante.')
      return
    }
    if (!eventAt) {
      setError('Escolha a data e hora do tour.')
      return
    }

    setSaving(true)
    try {
      await tourService.createTour({ restaurant, eventAt: new Date(eventAt) })
      onCreated?.()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        transition: { onExited: handleExited },
        paper: { sx: darkPaperSx },
      }}
    >
      <DialogTitle sx={{ pr: 6 }}>
        Novo tour
        <IconButton
          onClick={onClose}
          aria-label="Fechar"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!restaurant ? (
          <RestaurantSearch onSelect={setRestaurant} />
        ) : (
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 2,
                p: 2,
                mb: 2,
                borderRadius: 1,
                border: `1px solid ${colors.sand}`,
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.address}
                </Typography>
              </Box>
              <Button size="small" onClick={() => setRestaurant(null)}>
                Trocar
              </Button>
            </Box>

            <TextField
              label="Data e hora do tour"
              type="datetime-local"
              value={eventAt}
              onChange={(e) => setEventAt(e.target.value)}
              fullWidth
              required
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={saving || !restaurant || !eventAt}
        >
          {saving ? 'Salvando...' : 'Cadastrar tour'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
