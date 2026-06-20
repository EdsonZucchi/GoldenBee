import { useEffect, useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { placesService } from '../service/placesService'
import { colors } from '../theme/tokens'

const DEBOUNCE_MS = 500

/**
 * Campo de busca de restaurantes via Google Places (com debounce e cache).
 * Chama `onSelect(restaurant)` quando o usuário escolhe um resultado.
 */
export default function RestaurantSearch({ onSelect, selectedId }) {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const text = term.trim()
    let active = true

    const timer = setTimeout(async () => {
      if (text.length < 3) {
        setResults([])
        setError('')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')
      try {
        const found = await placesService.searchRestaurants(text)
        if (active) setResults(found)
      } catch (err) {
        if (active) {
          setError(err.message)
          setResults([])
        }
      } finally {
        if (active) setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [term])

  return (
    <Box>
      <TextField
        label="Buscar restaurante"
        placeholder="Ex.: pizzaria em Florianópolis"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        fullWidth
        autoFocus
        helperText="Digite ao menos 3 caracteres"
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {!loading && results.length > 0 && (
        <List sx={{ mt: 1, maxHeight: 320, overflowY: 'auto' }}>
          {results.map((restaurant) => (
            <ListItemButton
              key={restaurant.placeId}
              selected={restaurant.placeId === selectedId}
              onClick={() => onSelect(restaurant)}
              sx={{ borderRadius: 1, mb: 0.5, alignItems: 'flex-start' }}
            >
              <ListItemAvatar>
                <Avatar src={restaurant.photoUrl || undefined} variant="rounded">
                  <RestaurantIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={restaurant.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.secondary">
                      {restaurant.address}
                    </Typography>
                    {restaurant.rating != null && (
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ display: 'block', color: colors.amber }}
                      >
                        ★ {restaurant.rating} ({restaurant.ratingCount})
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  )
}
