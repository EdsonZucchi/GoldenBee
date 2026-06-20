import { Box, Paper, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Olá, {user?.displayName || 'colaborador'}! 👋
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Bem-vindo ao GoldenBee, sua central de tours gastronômicos.
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: 'rgba(255,248,236,.04)',
          border: '1px solid rgba(232,220,200,.1)',
          color: 'text.primary',
        }}
      >
        <Typography variant="body1">
          Em breve: agende tours, confirme presença e avalie os locais visitados.
        </Typography>
      </Paper>
    </Box>
  )
}
