import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import { colors } from '../theme/tokens'

/** Layout principal da aplicação (área autenticada): AppBar + conteúdo. */
export default function MainLayout() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: colors.charcoal,
          borderBottom: `1px solid rgba(245,166,35,.12)`,
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              component="button"
              onClick={() => navigate('/app')}
              aria-label="Ir para a página inicial"
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
          </Box>
          {isAdmin && (
            <Button color="inherit" sx={{ mr: 1 }} onClick={() => navigate('/app/admin')}>
              Admin
            </Button>
          )}
          <Typography variant="body2" sx={{ mr: 2, color: colors.sand }}>
            {user?.displayName || user?.email}
          </Typography>
          <Button color="primary" variant="outlined" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
