import SectionShell from '../common/SectionShell'
import EmptyState from '../common/EmptyState'

/** Seção "Próximo tour agendado". Sem tour confirmado no momento. */
export default function NextTourSection() {
  return (
    <SectionShell id="tour" label="em breve" title="Próximo tour agendado">
      <EmptyState
        icon="🗓️"
        title="Nenhum tour confirmado ainda"
        message="Assim que um próximo tour for agendado, ele aparecerá aqui com data, local e participantes confirmados."
      />
    </SectionShell>
  )
}
