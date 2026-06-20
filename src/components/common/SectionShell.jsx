import { Box, Container, Typography } from '@mui/material'

/**
 * Casca padrão de uma seção: espaçamento, rótulo (mono) e título (Playfair).
 * Centraliza o ritmo visual de todas as seções da landing.
 */
export default function SectionShell({ id, label, title, muted = false, children, sx }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: 'relative',
        scrollMarginTop: '80px',
        py: { xs: 8, md: 12 },
        px: { xs: 2.5, md: 5 },
        bgcolor: muted ? 'rgba(255,248,236,.03)' : 'transparent',
        ...sx,
      }}
    >
      <Container maxWidth="lg" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
        {label && (
          <Typography variant="overline" component="p" color="primary" sx={{ mb: 1 }}>
            {label}
          </Typography>
        )}
        {title && (
          <Typography
            variant="h3"
            component="h2"
            sx={{ color: 'common.white', mb: 5, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  )
}
