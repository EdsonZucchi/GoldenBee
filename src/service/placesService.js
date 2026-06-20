import { placesRepository } from '../repository/placesRepository'
import { placesCacheRepository } from '../repository/placesCacheRepository'
import { isGoogleMapsConfigured } from '../config/googleMaps'

/** Tempo de vida do cache: 30 dias. */
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000

/** True se o carimbo do Firestore (Timestamp) ainda está dentro do TTL. */
function isFresh(cachedAt) {
  if (!cachedAt?.toMillis) return false
  return Date.now() - cachedAt.toMillis() < CACHE_TTL_MS
}

/** Remove os metadados de cache, devolvendo só o restaurante do domínio. */
function stripCacheMeta(data) {
  if (!data) return data
  // eslint-disable-next-line no-unused-vars
  const { cachedAt, ...restaurant } = data
  return restaurant
}

/**
 * Normaliza a query para virar um id de documento estável e seguro:
 * minúsculas, sem acentos, espaços colapsados e caracteres não alfanuméricos
 * trocados por '-'. Inclui o limite de resultados para não misturar buscas.
 */
function buildSearchKey(query, maxResults) {
  const slug = query
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${slug || 'q'}__${maxResults}`
}

/**
 * Converte um objeto `Place` do Google em um restaurante do domínio GoldenBee.
 * Mantém o resto do app desacoplado da forma da Places API.
 */
function toRestaurant(place) {
  const location = place.location
    ? { lat: place.location.lat(), lng: place.location.lng() }
    : null

  const photoUrl = place.photos?.[0]?.getURI
    ? place.photos[0].getURI({ maxWidth: 800 })
    : null

  return {
    placeId: place.id,
    name: place.displayName ?? '',
    address: place.formattedAddress ?? '',
    location,
    rating: place.rating ?? null,
    ratingCount: place.userRatingCount ?? 0,
    photoUrl,
    types: place.types ?? [],
  }
}

/**
 * Service de Places, com cache no Firestore (TTL 30 dias).
 *
 * Fluxo de busca/consulta:
 *  1. consulta o cache no Firestore;
 *  2. se existir e estiver fresco (< 30 dias), usa o cache;
 *  3. se não existir ou estiver vencido, consulta o Google;
 *  4. atualiza o cache e retorna.
 */
export const placesService = {
  /** Pesquisa restaurantes por texto, usando cache quando possível. */
  async searchRestaurants(query, { maxResults = 10, forceRefresh = false } = {}) {
    if (!isGoogleMapsConfigured()) {
      throw new Error('Google Maps API não configurada.')
    }
    const text = query?.trim()
    if (!text) return []

    const key = buildSearchKey(text, maxResults)

    // 1-2) cache fresco → usa
    if (!forceRefresh) {
      const cached = await placesCacheRepository.getSearch(key)
      if (cached && isFresh(cached.cachedAt)) {
        return cached.results
      }
    }

    // 3) miss/vencido → Google
    const places = await placesRepository.searchByText(text, {
      includedType: 'restaurant',
      maxResultCount: maxResults,
    })
    const results = places.map(toRestaurant)

    // 4) atualiza o cache (busca + cada lugar), sem bloquear o retorno em erro
    await placesCacheRepository.saveSearch(key, { query: text, results })
    await Promise.all(
      results.map((restaurant) =>
        placesCacheRepository.savePlace(restaurant.placeId, restaurant),
      ),
    )

    return results
  },

  /** Detalhes de um restaurante específico, usando cache quando possível. */
  async getRestaurant(placeId, { forceRefresh = false } = {}) {
    if (!isGoogleMapsConfigured()) {
      throw new Error('Google Maps API não configurada.')
    }

    if (!forceRefresh) {
      const cached = await placesCacheRepository.getPlace(placeId)
      if (cached && isFresh(cached.cachedAt)) {
        return stripCacheMeta(cached)
      }
    }

    const place = await placesRepository.getDetails(placeId)
    const restaurant = toRestaurant(place)
    await placesCacheRepository.savePlace(placeId, restaurant)
    return restaurant
  },
}
