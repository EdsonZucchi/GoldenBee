import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import DashboardLayout from '../layout/DashboardLayout'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage'
import ToursPage from '../pages/ToursPage'
import ComingSoon from '../pages/ComingSoon'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública (login/cadastro via dialog na landing) */}
      <Route path="/" element={<LandingPage />} />

      {/* Área autenticada (sidebar) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/app" element={<HomePage />} />
          <Route path="/app/tours" element={<ToursPage />} />
          <Route path="/app/participantes" element={<ComingSoon title="Participantes" icon="👥" />} />
          <Route path="/app/avaliacoes" element={<ComingSoon title="Avaliações" icon="⭐" />} />
          <Route path="/app/estatisticas" element={<ComingSoon title="Estatísticas" icon="📊" />} />
          <Route path="/app/ranking" element={<ComingSoon title="Ranking" icon="🏆" />} />
          <Route path="/app/locais" element={<ComingSoon title="Locais" icon="📍" />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
