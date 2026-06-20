import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const TOURS = 'tours'
const PARTICIPANTS = 'participants'

/**
 * Repository de participantes de um tour.
 * Cada confirmação é um documento em `tours/{tourId}/participants/{uid}`,
 * o que mantém os participantes fora do documento público do tour.
 */
export const participantRepository = {
  /** Lista os participantes confirmados, por ordem de confirmação. */
  async list(tourId) {
    const q = query(
      collection(db, TOURS, tourId, PARTICIPANTS),
      orderBy('confirmedAt', 'asc'),
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ uid: d.id, ...d.data() }))
  },

  /** Confirma a presença de um usuário (id do doc = uid). */
  confirm(tourId, uid, data) {
    return setDoc(doc(db, TOURS, tourId, PARTICIPANTS, uid), {
      ...data,
      confirmedAt: serverTimestamp(),
    })
  },

  /** Remove a confirmação de um usuário. */
  remove(tourId, uid) {
    return deleteDoc(doc(db, TOURS, tourId, PARTICIPANTS, uid))
  },
}
