import { placesRepository } from '../repository/placesRepository'
import { isGoogleMapsConfigured } from '../config/googleMaps'

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
 * Service de Places.
 * Aplica as regras de negócio (validação, filtro por restaurante) e
 * traduz o resultado para o modelo de domínio.
 */
export const placesService = {
  /** Pesquisa restaurantes por texto. Retorna lista de restaurantes do domínio. */
  async searchRestaurants(query, { maxResults = 10 } = {}) {
    if (!isGoogleMapsConfigured()) {
      throw new Error('Google Maps API não configurada.')
    }
    const text = query?.trim()
    if (!text) return []

    const places = await placesRepository.searchByText(text, {
      includedType: 'restaurant',
      maxResultCount: maxResults,
    })
    return places.map(toRestaurant)
  },

  /** Detalhes de um restaurante específico (usado ao agendar um tour). */
  async getRestaurant(placeId) {
    if (!isGoogleMapsConfigured()) {
      throw new Error('Google Maps API não configurada.')
    }
    const place = await placesRepository.getDetails(placeId)
    return toRestaurant(place)
  },
}
