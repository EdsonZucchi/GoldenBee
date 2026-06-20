import { Box, Typography } from '@mui/material'
import HexPattern from '../common/HexPattern'
import { colors } from '../../theme/tokens'

/** Seção hero da landing: chamada principal. */
export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        pt: 14,
        pb: 8,
      }}
    >
      <HexPattern />

      <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1000, mx: 'auto' }}>
        <Typography variant="overline" component="p" color="primary" sx={{ mb: 3 }}>
          Gastronomia · Equipe · Experiência
        </Typography>

        <Typography
          variant="h1"
          sx={{
            color: 'common.white',
            fontSize: { xs: '3rem', sm: '5rem', md: '7rem' },
            maxWidth: '16ch',
            mx: 'auto',
          }}
        >
          A mesa que une{' '}
          <Box component="em" sx={{ fontStyle: 'italic', color: colors.amber }}>
            toda a equipe
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 3.5,
            fontSize: '1.1rem',
            color: colors.muted,
            lineHeight: 1.7,
            maxWidth: '48ch',
            mx: 'auto',
            fontWeight: 300,
          }}
        >
          GoldenBee organiza tours gastronômicos entre colegas — do agendamento ao
          histórico, tudo em um só lugar.
        </Typography>
      </Box>
    </Box>
  )
}
