/**
 * Parametrização da Google Maps Platform.
 * Fonte única dos parâmetros usados ao carregar a Maps JavaScript API
 * e ao consultar a Places API.
 *
 * A chave é pública (vai para o cliente, como a do Firebase), então deve ser
 * restringida no Cloud Console por referenciador HTTP e por API habilitada.
 */
export const googleMapsConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,

  // Bibliotecas extras carregadas junto da Maps JavaScript API.
  // 'places' habilita busca de restaurantes, autocomplete e detalhes do local.
  libraries: ['places'],

  // Localização padrão (Brasil / português).
  language: 'pt-BR',
  region: 'BR',

  // Canal de versão da API ('weekly' | 'quarterly' | número fixo ex.: '3.58').
  version: 'weekly',
}

/** True quando a chave está configurada. Útil para desabilitar recursos de mapa. */
export function isGoogleMapsConfigured() {
  return Boolean(googleMapsConfig.apiKey)
}

/** Avisa em desenvolvimento se a chave não estiver definida. */
export function assertGoogleMapsConfig() {
  if (!isGoogleMapsConfigured()) {
    console.warn(
      '[GoldenBee] VITE_GOOGLE_MAPS_API_KEY não definida — recursos de mapa e Places ficarão indisponíveis.',
    )
  }
}
