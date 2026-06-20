import { Loader } from '@googlemaps/js-api-loader'
import { googleMapsConfig } from './googleMaps'

/**
 * Loader singleton da Google Maps JavaScript API.
 * Carrega a API uma única vez; `importLibrary` é cacheado pelo próprio loader.
 */
let loader

function getLoader() {
  if (!loader) {
    loader = new Loader({
      apiKey: googleMapsConfig.apiKey,
      version: googleMapsConfig.version,
      libraries: googleMapsConfig.libraries,
      language: googleMapsConfig.language,
      region: googleMapsConfig.region,
    })
  }
  return loader
}

/** Carrega a biblioteca `places` (busca/detalhes de restaurantes). */
export function importPlacesLibrary() {
  return getLoader().importLibrary('places')
}

/** Carrega a biblioteca `maps` (renderização do mapa). */
export function importMapsLibrary() {
  return getLoader().importLibrary('maps')
}

/** Carrega a biblioteca `marker` (marcadores avançados no mapa). */
export function importMarkerLibrary() {
  return getLoader().importLibrary('marker')
}
