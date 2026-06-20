/**
 * Estilo dark do mapa do Google nas cores do GoldenBee (carvão + âmbar).
 * Aplicado via `styles` na Maps JavaScript API (mapas SEM mapId).
 */
export const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1f1b14' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#14110b' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#b09a78' }] },

  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#5c4a2a' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#f5a623' }] },

  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#8a7560' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#20271a' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#5e7050' }] },

  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2419' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#14110b' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9c8b6e' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#5c4a2a' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1a150d' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },

  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2a2419' }] },
  { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#f5a623' }] },

  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f1217' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4a5260' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#0f1217' }] },
]
