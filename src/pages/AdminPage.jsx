import { Box, Paper, Typography } from '@mui/material'

/** Área administrativa — acessível apenas a usuários com papel `admin`. */
export default function AdminPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Administração 🛠️
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Área restrita a administradores.
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
          Em breve: gerenciar tours, participantes e papéis de usuário.
        </Typography>
      </Paper>
    </Box>
  )
}
