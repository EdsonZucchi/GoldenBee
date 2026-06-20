import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import MainLayout from '../layout/MainLayout'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública (login/cadastro via dialog na landing) */}
      <Route path="/" element={<LandingPage />} />

      {/* Rotas protegidas (área autenticada) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/app" element={<HomePage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
