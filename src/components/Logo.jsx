import { Box, Typography } from '@mui/material'
import { fonts } from '../theme/tokens'

/** Marca do GoldenBee: abelha + wordmark em Playfair Display âmbar. */
export default function Logo({ size = 'medium', color = 'primary.main' }) {
  const fontSize = { small: '1.1rem', medium: '1.35rem', large: '2rem' }[size]

  return (
    <Box
      component="span"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}
    >
      <Box component="span" sx={{ fontSize: `calc(${fontSize} * 1.1)` }}>
        🐝
      </Box>
      <Typography
        component="span"
        sx={{
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize,
          color,
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}
      >
        GoldenBee
      </Typography>
    </Box>
  )
}
