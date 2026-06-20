import { Box, CircularProgress } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Protege rotas por papel. Use dentro de uma área já autenticada.
 *
 *   <Route element={<RoleRoute roles={[ROLES.ADMIN]} />}> ... </Route>
 *
 * - Não autenticado → landing (`/`)
 * - Autenticado sem o papel exigido → área padrão (`/app`)
 */
export default function RoleRoute({ roles }) {
  const { isAuthenticated, role, loading } = useAuth()

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (!roles.includes(role)) {
    return <Navigate to="/app" replace />
  }

  return <Outlet />
}
