import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

// Coleções de cache no Firestore.
const SEARCHES = 'placeSearches' // resultados de busca por texto
const PLACES = 'places' // detalhes de um lugar por placeId

/**
 * Repository de cache de Places.
 * Persiste no Firestore os resultados já consultados no Google, com o
 * carimbo `cachedAt` usado para avaliar o vencimento (TTL).
 *
 * Leituras/escritas são tolerantes a falha: em caso de erro retornam
 * null / não propagam, para nunca quebrar a busca por causa do cache.
 */
export const placesCacheRepository = {
  async getSearch(key) {
    try {
      const snap = await getDoc(doc(db, SEARCHES, key))
      return snap.exists() ? snap.data() : null
    } catch {
      return null
    }
  },

  async saveSearch(key, data) {
    try {
      await setDoc(doc(db, SEARCHES, key), { ...data, cachedAt: serverTimestamp() })
    } catch {
      /* cache é best-effort */
    }
  },

  async getPlace(placeId) {
    try {
      const snap = await getDoc(doc(db, PLACES, placeId))
      return snap.exists() ? snap.data() : null
    } catch {
      return null
    }
  },

  async savePlace(placeId, data) {
    try {
      await setDoc(
        doc(db, PLACES, placeId),
        { ...data, cachedAt: serverTimestamp() },
        { merge: true },
      )
    } catch {
      /* cache é best-effort */
    }
  },
}
