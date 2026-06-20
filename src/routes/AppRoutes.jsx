import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import RoleRoute from '../components/RoleRoute'
import MainLayout from '../layout/MainLayout'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage'
import AdminPage from '../pages/AdminPage'
import { ROLES } from '../constants/roles'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública (login/cadastro via dialog na landing) */}
      <Route path="/" element={<LandingPage />} />

      {/* Rotas protegidas (área autenticada) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/app" element={<HomePage />} />

          {/* Subárea exclusiva de admin */}
          <Route element={<RoleRoute roles={[ROLES.ADMIN]} />}>
            <Route path="/app/admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
