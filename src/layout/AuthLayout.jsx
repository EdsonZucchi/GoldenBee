import { Box, Container, Paper, Typography } from '@mui/material'

/** Layout das telas de autenticação: cartão centralizado com a marca. */
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              🐝 GoldenBee
            </Typography>
            {title && (
              <Typography variant="h6" sx={{ mt: 1 }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {children}
        </Paper>
      </Container>
    </Box>
  )
}
