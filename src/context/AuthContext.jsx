import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../service/authService'
import { DEFAULT_ROLE, isAdmin as checkIsAdmin } from '../constants/roles'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.observeAuth(async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        // Carrega o perfil (com role) do Firestore após autenticar
        try {
          const userProfile = await authService.getProfile(currentUser.uid)
          setProfile(userProfile)
        } catch {
          setProfile(null)
        }
      } else {
        setProfile(null)
      }

      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = useMemo(() => {
    // Usuários sem documento de perfil (ex.: criados antes do role) caem no padrão
    const role = profile?.role ?? DEFAULT_ROLE

    return {
      user,
      profile,
      role,
      isAdmin: checkIsAdmin(role),
      loading,
      isAuthenticated: !!user,
      login: authService.login,
      register: authService.register,
      logout: authService.logout,
    }
  }, [user, profile, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
