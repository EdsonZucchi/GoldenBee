import { Box, Typography } from '@mui/material'
import Logo from '../components/Logo'
import { colors } from '../theme/tokens'

/** Rodapé da landing. */
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid rgba(232,220,200,.08)',
        py: 4,
        px: { xs: 2.5, md: 5 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Logo size="small" />
      <Typography sx={{ fontSize: '.8rem', color: colors.muted }}>
        Tours gastronômicos entre equipes · Feito com 🍽️ e ☕
      </Typography>
    </Box>
  )
}
