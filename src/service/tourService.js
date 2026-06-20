import { tourRepository } from '../repository/tourRepository'

/**
 * Service de tours.
 * Aplica as regras de negócio: validação, numeração sequencial e montagem
 * do documento a partir do restaurante escolhido.
 */
export const tourService = {
  /**
   * Cria um novo tour a partir de um restaurante (resultado do Places) e da
   * data/hora do evento. A escrita só é permitida a admins (regras do Firestore).
   */
  async createTour({ restaurant, eventAt }) {
    if (!restaurant?.placeId) {
      throw new Error('Selecione um restaurante.')
    }
    if (!(eventAt instanceof Date) || Number.isNaN(eventAt.getTime())) {
      throw new Error('Escolha a data e hora do tour.')
    }

    const tourNumber = await tourRepository.getNextNumber()

    const ref = await tourRepository.create({
      tourNumber,
      placeId: restaurant.placeId,
      // snapshot do restaurante para exibição sem nova chamada ao Google
      restaurant: {
        name: restaurant.name ?? '',
        address: restaurant.address ?? '',
        location: restaurant.location ?? null,
        photoUrl: restaurant.photoUrl ?? null,
        rating: restaurant.rating ?? null,
        ratingCount: restaurant.ratingCount ?? 0,
      },
      eventAt,
      participants: [], // confirmação dos usuários virá depois
    })

    return ref.id
  },

  /** Próximo tour agendado, ou null se não houver. */
  getNextTour() {
    return tourRepository.getNextUpcoming()
  },

  /** Lista todos os tours (passados e futuros), do mais recente ao mais antigo. */
  listTours() {
    return tourRepository.listAll()
  },
}
