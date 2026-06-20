import { Box, Button, Stack } from '@mui/material'
import Logo from '../components/Logo'
import { colors } from '../theme/tokens'

const LINKS = [
  { label: 'Próximo Tour', href: '#tour' },
  { label: 'Histórico', href: '#historico' },
  { label: 'Avaliações', href: '#avaliacoes' },
]

/** Navbar pública (landing): logo, âncoras e CTA de entrar. */
export default function PublicNavbar({ onLogin }) {
  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1.5,
        px: { xs: 2, md: 5 },
        bgcolor: 'rgba(26,26,26,.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245,166,35,.12)',
      }}
    >
      <Box
        component="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao início"
        sx={{
          background: 'none',
          border: 'none',
          p: 0,
          cursor: 'pointer',
          display: 'inline-flex',
        }}
      >
        <Logo size="medium" />
      </Box>

      <Stack
        direction="row"
        spacing={4}
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        {LINKS.map((link) => (
          <Box
            key={link.href}
            component="a"
            href={link.href}
            sx={{
              color: colors.sand,
              textDecoration: 'none',
              fontSize: '.875rem',
              fontWeight: 500,
              letterSpacing: '.03em',
              transition: 'color .2s',
              '&:hover': { color: colors.amber },
            }}
          >
            {link.label}
          </Box>
        ))}
      </Stack>

      <Button onClick={onLogin} variant="contained" size="small">
        Entrar
      </Button>
    </Box>
  )
}
