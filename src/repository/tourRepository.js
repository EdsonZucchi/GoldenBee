import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const COLLECTION = 'tours'

/**
 * Repository de tours.
 * Encapsula o acesso ao Firestore para a coleção `tours`.
 */
export const tourRepository = {
  /** Próximo número sequencial de tour (maior número existente + 1). */
  async getNextNumber() {
    const q = query(collection(db, COLLECTION), orderBy('tourNumber', 'desc'), limit(1))
    const snap = await getDocs(q)
    if (snap.empty) return 1
    return (snap.docs[0].data().tourNumber || 0) + 1
  },

  /** Cria um tour. `eventAt` deve ser um Date; `createdAt` é gravado no servidor. */
  create(data) {
    return addDoc(collection(db, COLLECTION), {
      ...data,
      eventAt: data.eventAt instanceof Date ? Timestamp.fromDate(data.eventAt) : data.eventAt,
      createdAt: serverTimestamp(),
    })
  },

  /** Lista todos os tours, do mais recente para o mais antigo (por data do evento). */
  async listAll() {
    const q = query(collection(db, COLLECTION), orderBy('eventAt', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  },

  /** Próximo tour agendado (evento ainda não ocorrido), ou null. */
  async getNextUpcoming() {
    const q = query(
      collection(db, COLLECTION),
      where('eventAt', '>=', Timestamp.fromDate(new Date())),
      orderBy('eventAt', 'asc'),
      limit(1),
    )
    const snap = await getDocs(q)
    if (snap.empty) return null
    const docSnap = snap.docs[0]
    return { id: docSnap.id, ...docSnap.data() }
  },
}
