import SectionShell from '../common/SectionShell'
import EmptyState from '../common/EmptyState'

/** Seção de histórico de tours realizados. Ainda sem registros. */
export default function HistorySection() {
  return (
    <SectionShell id="historico" label="memória da equipe" title="Tours realizados">
      <EmptyState
        icon="📚"
        title="Nenhum tour realizado ainda"
        message="O histórico dos tours gastronômicos da equipe, com datas e avaliações, será exibido aqui."
      />
    </SectionShell>
  )
}
