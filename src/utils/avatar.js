const PALETTE = ['#7C5CBF', '#3D8B6E', '#C45C2B', '#2B6EC4', '#B23A6E', '#C47B00']

/** Iniciais (até 2 letras) a partir do nome. */
export function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/** Cor estável derivada de uma string (nome/uid), para o avatar. */
export function colorFromString(str = '') {
  let hash = 0
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return PALETTE[Math.abs(hash) % PALETTE.length]
}
