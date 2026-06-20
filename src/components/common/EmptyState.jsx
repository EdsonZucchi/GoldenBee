import { Box, Typography } from '@mui/material'
import { colors } from '../../theme/tokens'

/** Estado vazio padrão: ícone, título e mensagem auxiliar. */
export default function EmptyState({ icon, title, message }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 5, md: 7 },
        px: 3,
        borderRadius: '1.25rem',
        bgcolor: 'rgba(255,248,236,.04)',
        border: '1px dashed rgba(232,220,200,.18)',
      }}
    >
      {icon && (
        <Box component="span" sx={{ fontSize: '2.5rem', display: 'block', mb: 1.5 }}>
          {icon}
        </Box>
      )}
      <Typography variant="h6" sx={{ color: colors.cream, mb: 0.5 }}>
        {title}
      </Typography>
      {message && (
        <Typography sx={{ fontSize: '.9rem', color: colors.muted, maxWidth: '42ch', mx: 'auto' }}>
          {message}
        </Typography>
      )}
    </Box>
  )
}
