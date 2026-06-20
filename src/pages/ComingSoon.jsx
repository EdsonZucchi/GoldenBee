import { Box, Typography } from '@mui/material'
import EmptyState from '../components/common/EmptyState'

/** Página placeholder para seções ainda não implementadas. */
export default function ComingSoon({ title, icon = '🚧' }) {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        {title}
      </Typography>
      <EmptyState
        icon={icon}
        title="Em breve"
        message="Esta seção ainda está em desenvolvimento."
      />
    </Box>
  )
}
