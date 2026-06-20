import { importPlacesLibrary } from '../config/googleMapsLoader'

// Campos buscados por padrão. Quanto menos campos, menor o custo da requisição.
const DEFAULT_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'location',
  'rating',
  'userRatingCount',
  'photos',
  'types',
]

/**
 * Repository de Places.
 * Encapsula as chamadas à Places API (New) via Maps JavaScript API.
 * Retorna objetos `Place` crus — o mapeamento para o domínio fica no service.
 */
export const placesRepository = {
  /** Busca lugares por texto livre (ex.: "pizzaria em Florianópolis"). */
  async searchByText(textQuery, { fields = DEFAULT_FIELDS, maxResultCount = 10, includedType } = {}) {
    const { Place } = await importPlacesLibrary()
    const { places } = await Place.searchByText({
      textQuery,
      fields,
      maxResultCount,
      ...(includedType ? { includedType } : {}),
    })
    return places
  },

  /** Carrega os detalhes de um lugar específico pelo seu placeId. */
  async getDetails(placeId, { fields = DEFAULT_FIELDS } = {}) {
    const { Place } = await importPlacesLibrary()
    const place = new Place({ id: placeId })
    await place.fetchFields({ fields })
    return place
  },
}
