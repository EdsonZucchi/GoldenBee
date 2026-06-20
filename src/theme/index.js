import { createTheme } from '@mui/material/styles'
import { colors, fonts, radii } from './tokens'

/**
 * Tema MUI do GoldenBee, montado a partir dos design tokens.
 * Base dark (carvão) com acento âmbar dourado.
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.amber, dark: colors.amberDark, contrastText: colors.cocoa },
    secondary: { main: colors.cocoa, contrastText: colors.cream },
    background: { default: colors.charcoal, paper: colors.cream },
    text: { primary: colors.cream, secondary: colors.muted },
    divider: colors.sand,
    common: { ...colors },
  },

  shape: { borderRadius: 12 },

  typography: {
    fontFamily: fonts.body,
    // Títulos com Playfair Display
    h1: { fontFamily: fonts.display, fontWeight: 900, lineHeight: 1.05 },
    h2: { fontFamily: fonts.display, fontWeight: 700, lineHeight: 1.15 },
    h3: { fontFamily: fonts.display, fontWeight: 700 },
    h4: { fontFamily: fonts.display, fontWeight: 700 },
    h5: { fontFamily: fonts.display, fontWeight: 700 },
    h6: { fontFamily: fonts.display, fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
    // Rótulos/dados com DM Mono
    overline: {
      fontFamily: fonts.mono,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontSize: '0.7rem',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: radii.pill, paddingInline: '1.6rem' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
})

export default theme
