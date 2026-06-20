import { Box, Button, Typography } from '@mui/material'
import { colors } from '../../theme/tokens'

/** Seção final de chamada para ação. */
export default function CtaSection({ onAccess }) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        textAlign: 'center',
        py: 12,
        px: { xs: 2.5, md: 5 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,166,35,.08) 0%, transparent 70%)',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            color: colors.white,
            fontWeight: 900,
            maxWidth: '20ch',
            mx: 'auto',
            mb: 1.5,
            fontSize: { xs: '2rem', md: '3.5rem' },
          }}
        >
          Pronto para o próximo <Box component="span" sx={{ color: colors.amber }}>tour</Box>?
        </Typography>
        <Typography sx={{ color: colors.muted, maxWidth: '44ch', mx: 'auto', mb: 5, lineHeight: 1.7 }}>
          Entre na plataforma, confirme sua presença e traga o apetite. A mesa espera por você.
        </Typography>
        <Button
          onClick={onAccess}
          variant="contained"
          size="large"
          sx={{ fontSize: '1.05rem', px: 4.5, py: 1.5 }}
        >
          Acessar o GoldenBee 🐝
        </Button>
      </Box>
    </Box>
  )
}
