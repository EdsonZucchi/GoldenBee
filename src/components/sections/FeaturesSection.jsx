import { Box, Typography } from '@mui/material'
import SectionShell from '../common/SectionShell'
import { colors } from '../../theme/tokens'

const FEATURES = [
  {
    icon: '🗓️',
    title: 'Agendamento simples',
    desc: 'Crie um tour em segundos: escolha o restaurante, defina data e hora, e convites de calendário são enviados automaticamente para todos.',
  },
  {
    icon: '📍',
    title: 'Busca via Google Places',
    desc: 'Pesquise restaurantes e obtenha endereço, fotos e localização automaticamente — sem precisar digitar nada manualmente.',
  },
  {
    icon: '✅',
    title: 'Confirmação de presença',
    desc: 'Cada participante confirma com um clique. A lista atualiza em tempo real para todos os organizadores.',
  },
  {
    icon: '⭐',
    title: 'Avaliações pós-tour',
    desc: 'Depois de cada visita, participantes deixam nota e comentário. O ranking ajuda a escolher os próximos destinos.',
  },
  {
    icon: '📚',
    title: 'Histórico completo',
    desc: 'Todos os tours realizados ficam registrados com data, participantes e avaliações — uma memória gastronômica da equipe.',
  },
  {
    icon: '🏆',
    title: 'Ranking de restaurantes',
    desc: 'Veja quais lugares a equipe mais amou e use as estatísticas para guiar as próximas escolhas com confiança.',
  },
]

/** Seção de funcionalidades: grid de cards escuros translúcidos. */
export default function FeaturesSection() {
  return (
    <SectionShell
      muted
      label="funcionalidades"
      title={
        <>
          Tudo que você precisa,
          <br />
          sem complicação
        </>
      }
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 3,
        }}
      >
        {FEATURES.map((feature) => (
          <Box
            key={feature.title}
            sx={{
              p: 3.5,
              borderRadius: '1.25rem',
              bgcolor: 'rgba(255,248,236,.04)',
              border: '1px solid rgba(232,220,200,.1)',
              transition: 'border-color .25s, transform .25s',
              '&:hover': {
                borderColor: 'rgba(245,166,35,.4)',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '.75rem',
                bgcolor: 'rgba(245,166,35,.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.35rem',
                mb: 2,
              }}
            >
              {feature.icon}
            </Box>
            <Typography variant="h6" sx={{ color: colors.white, fontSize: '1.15rem', mb: 1 }}>
              {feature.title}
            </Typography>
            <Typography sx={{ fontSize: '.875rem', color: colors.muted, lineHeight: 1.65 }}>
              {feature.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </SectionShell>
  )
}
