import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import { googleMapsConfig } from './googleMaps'

/**
 * Bootstrap da Google Maps JavaScript API (API funcional do js-api-loader v2).
 * `setOptions` é aplicado uma única vez; `importLibrary` é cacheado internamente.
 */
let configured = false

function ensureConfigured() {
  if (!configured) {
    setOptions({
      key: googleMapsConfig.apiKey,
      v: googleMapsConfig.version,
      libraries: googleMapsConfig.libraries,
      language: googleMapsConfig.language,
      region: googleMapsConfig.region,
    })
    configured = true
  }
}

/** Carrega a biblioteca `places` (busca/detalhes de restaurantes). */
export function importPlacesLibrary() {
  ensureConfigured()
  return importLibrary('places')
}

/** Carrega a biblioteca `maps` (renderização do mapa). */
export function importMapsLibrary() {
  ensureConfigured()
  return importLibrary('maps')
}

/** Carrega a biblioteca `marker` (marcadores avançados no mapa). */
export function importMarkerLibrary() {
  ensureConfigured()
  return importLibrary('marker')
}
