import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NewTourDialog from '../components/NewTourDialog'
import TourListItem from '../components/TourListItem'
import EmptyState from '../components/common/EmptyState'
import { tourService } from '../service/tourService'

/** Área administrativa — acessível apenas a usuários com papel `admin`. */
export default function AdminPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)

  // Recarrega a lista (usado após cadastrar). Em handler/manual, setState é ok.
  const loadTours = useCallback(async () => {
    setLoading(true)
    try {
      setTours(await tourService.listTours())
    } catch {
      setTours([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Carga inicial: setState só após o await (não-síncrono no corpo do efeito).
  useEffect(() => {
    let active = true
    tourService
      .listTours()
      .then((data) => active && setTours(data))
      .catch(() => active && setTours([]))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  function handleCreated() {
    setSuccess(true)
    loadTours()
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Administração 🛠️
          </Typography>
          <Typography color="text.secondary">
            Gerencie os tours gastronômicos da equipe.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Cadastrar novo tour
        </Button>
      </Box>

      <Typography variant="overline" color="primary">
        Tours cadastrados
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : tours.length > 0 ? (
        <Paper
          elevation={0}
          sx={{
            mt: 1,
            bgcolor: 'rgba(255,248,236,.04)',
            border: '1px solid rgba(232,220,200,.12)',
          }}
        >
          <List disablePadding>
            {tours.map((tour) => (
              <TourListItem key={tour.id} tour={tour} />
            ))}
          </List>
        </Paper>
      ) : (
        <Box sx={{ mt: 1 }}>
          <EmptyState
            icon="🗓️"
            title="Nenhum tour cadastrado"
            message="Use o botão acima para cadastrar o primeiro tour gastronômico."
          />
        </Box>
      )}

      <NewTourDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={handleCreated}
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
