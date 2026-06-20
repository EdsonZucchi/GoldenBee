import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { importMapsLibrary } from '../config/googleMapsLoader'
import { darkMapStyle } from '../config/mapStyle'
import { colors } from '../theme/tokens'

/**
 * Mapa do Google centrado em `location`, com estilo dark (cores da marca)
 * e um marcador âmbar no local.
 *
 * Usa estilo JSON (`styles`) — por isso o mapa NÃO usa `mapId` e o marcador
 * é o clássico `google.maps.Marker` (AdvancedMarker exigiria mapId, que
 * desabilitaria o estilo por código).
 */
export default function PlaceMap({ location, name, height = 220 }) {
  const ref = useRef(null)
  const lat = location?.lat
  const lng = location?.lng

  useEffect(() => {
    if (lat == null || lng == null || !ref.current) return
    const center = { lat, lng }
    let cancelled = false
    let marker

    importMapsLibrary()
      .then(({ Map }) => {
        if (cancelled || !ref.current) return
        const map = new Map(ref.current, {
          center,
          zoom: 16,
          disableDefaultUI: true,
          clickableIcons: false,
          styles: darkMapStyle,
        })
        const Marker = window.google.maps.Marker
        marker = new Marker({
          position: center,
          map,
          title: name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 9,
            fillColor: colors.amber,
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        })
      })
      .catch(() => {
        /* mapa indisponível (ex.: chave não configurada) */
      })

    return () => {
      cancelled = true
      if (marker) marker.setMap(null)
    }
  }, [lat, lng, name])

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        height,
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: 'rgba(0,0,0,.25)',
      }}
    />
  )
}
