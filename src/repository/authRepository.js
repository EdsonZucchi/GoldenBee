import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../config/firebase'

/**
 * Repository de autenticação.
 * Encapsula as chamadas diretas ao Firebase Auth SDK.
 * Não contém regras de negócio — apenas acesso ao dado.
 */
export const authRepository = {
  createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  },

  signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  },

  signOut() {
    return signOut(auth)
  },

  updateDisplayName(user, displayName) {
    return updateProfile(user, { displayName })
  },

  /** Observa mudanças no estado de autenticação. Retorna a função de unsubscribe. */
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback)
  },

  getCurrentUser() {
    return auth.currentUser
  },
}
