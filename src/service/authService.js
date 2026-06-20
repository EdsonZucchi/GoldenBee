import { authRepository } from '../repository/authRepository'
import { userRepository } from '../repository/userRepository'

/** Traduz códigos de erro do Firebase Auth para mensagens amigáveis (pt-BR). */
function mapAuthError(error) {
  const messages = {
    'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/user-not-found': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
  }
  return new Error(messages[error?.code] || 'Ocorreu um erro. Tente novamente.')
}

/**
 * Service de autenticação.
 * Orquestra o repository de auth e o de usuário, aplicando as regras de negócio.
 */
export const authService = {
  /**
   * Cadastra um novo usuário: cria a credencial no Auth, define o nome de
   * exibição e persiste o perfil (nome, e-mail, celular) no Firestore.
   */
  async register({ name, email, phone, password }) {
    try {
      const { user } = await authRepository.createUser(email, password)
      await authRepository.updateDisplayName(user, name)
      await userRepository.save(user.uid, { name, email, phone })
      return user
    } catch (error) {
      throw mapAuthError(error)
    }
  },

  async login({ email, password }) {
    try {
      const { user } = await authRepository.signIn(email, password)
      return user
    } catch (error) {
      throw mapAuthError(error)
    }
  },

  logout() {
    return authRepository.signOut()
  },

  observeAuth(callback) {
    return authRepository.onAuthStateChanged(callback)
  },
}
