/**
 * Níveis de usuário do GoldenBee.
 * O papel é armazenado no documento `users/{uid}` do Firestore (campo `role`).
 * Para promover alguém a admin, edite esse campo no Firebase Console.
 */
export const ROLES = {
  ADMIN: 'admin',
  DEFAULT: 'default',
}

/** Papel atribuído por padrão a novos cadastros. */
export const DEFAULT_ROLE = ROLES.DEFAULT

export function isAdmin(role) {
  return role === ROLES.ADMIN
}
