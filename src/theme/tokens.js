/**
 * Design tokens do GoldenBee.
 * Fonte única da verdade para cores, tipografia e raios.
 * Conceito: colmeia + gastronomia mediterrânea — âmbar dourado, ouro quente,
 * contraste com carvão.
 */

export const colors = {
  amber: '#F5A623', // Âmbar dourado (principal)
  amberDark: '#C47B00', // Ouro escuro (hover / acento)
  charcoal: '#1A1A1A', // Carvão profundo (fundo escuro)
  cream: '#FFF8EC', // Creme quente (fundo claro / cards)
  sand: '#E8DCC8', // Areia (bordas e divisores)
  cocoa: '#3D2B0F', // Cacau (texto sobre claro)
  muted: '#8A7560', // Texto secundário
  white: '#FFFFFF',
}

export const fonts = {
  display: "'Playfair Display', Georgia, serif", // títulos — elegância gastronômica
  body: "'Inter', system-ui, sans-serif", // corpo — leitura clara e moderna
  mono: "'DM Mono', ui-monospace, monospace", // dados, avaliações, datas
}

export const radii = {
  sm: '0.75rem',
  md: '1.25rem',
  lg: '1.5rem',
  pill: '2rem',
}
