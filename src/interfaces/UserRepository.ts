import { User } from '../domain/User';

/**
 * Interfaz del repositorio de usuarios
 * Define el contrato que deben implementar los repositorios concretos
 */
export interface UserRepository {
  /**
   * Obtiene todos los usuarios
   */
  getAllUsers(): Promise<User[]>;

  /**
   * Obtiene un usuario por su ID
   * @param id - ID del usuario
   */
  getUserById(id: number): Promise<User | null>;

  /**
   * Busca usuarios por nombre o email
   * @param query - Término de búsqueda
   */
  searchUsers(query: string): Promise<User[]>;

  /**
   * Obtiene usuarios con paginación
   * @param page - Número de página (empezando en 1)
   * @param limit - Cantidad de usuarios por página
   */
  getUsersPaginated(
    page: number,
    limit: number
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
  }>;
}
