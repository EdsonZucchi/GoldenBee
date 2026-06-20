import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const COLLECTION = 'users'

/**
 * Repository de usuários.
 * Encapsula o acesso ao Firestore para o perfil do usuário.
 */
export const userRepository = {
  /** Cria/atualiza o documento de perfil do usuário (id = uid do Auth). */
  save(uid, data) {
    const ref = doc(db, COLLECTION, uid)
    return setDoc(
      ref,
      { ...data, updatedAt: serverTimestamp() },
      { merge: true },
    )
  },

  async findById(uid) {
    const ref = doc(db, COLLECTION, uid)
    const snapshot = await getDoc(ref)
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  },
}
