import { Paper, Typography } from '@mui/material'
import { colors, fonts } from '../theme/tokens'

/** Card de estatística do dashboard (rótulo, valor em destaque e dica). */
export default function StatCard({ label, value, hint, highlight }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 2,
        minWidth: 0,
        bgcolor: 'rgba(255,248,236,.04)',
        border: `1px solid ${highlight ? 'rgba(245,166,35,.4)' : 'rgba(232,220,200,.1)'}`,
      }}
    >
      <Typography variant="overline" sx={{ color: colors.muted }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: fonts.display,
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1.1,
          color: highlight ? colors.amber : colors.cream,
        }}
      >
        {value}
      </Typography>
      {hint && (
        <Typography variant="body2" sx={{ color: colors.muted, mt: 0.5 }}>
          {hint}
        </Typography>
      )}
    </Paper>
  )
}
