import SectionShell from '../common/SectionShell'
import EmptyState from '../common/EmptyState'

/** Seção de avaliações da equipe. Ainda sem avaliações. */
export default function ReviewsSection() {
  return (
    <SectionShell id="avaliacoes" label="o que a equipe diz" title="Avaliações recentes">
      <EmptyState
        icon="⭐"
        title="Sem avaliações ainda"
        message="Depois de cada tour, as avaliações e comentários da equipe aparecerão aqui."
      />
    </SectionShell>
  )
}
