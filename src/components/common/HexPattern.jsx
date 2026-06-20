import { Box } from '@mui/material'
import { colors } from '../../theme/tokens'

/** Padrão decorativo de hexágonos (colmeia) para fundos de seção. */
export default function HexPattern({ opacity = 0.045 }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        '& svg': { width: '100%', height: '100%', opacity },
      }}
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hex"
            x="0"
            y="0"
            width="80"
            height="92"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="40,2 76,22 76,62 40,82 4,62 4,22"
              fill="none"
              stroke={colors.amber}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>
    </Box>
  )
}
