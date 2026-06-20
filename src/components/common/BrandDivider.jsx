import { Box } from '@mui/material'

/** Divisor com gradiente âmbar, usado entre seções. */
export default function BrandDivider() {
  return (
    <Box
      aria-hidden
      sx={{
        height: '1px',
        mx: 5,
        background:
          'linear-gradient(to right, transparent, rgba(245,166,35,.2), transparent)',
      }}
    />
  )
}
