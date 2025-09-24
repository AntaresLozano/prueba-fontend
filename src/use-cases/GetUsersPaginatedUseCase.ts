import { User } from '../domain/User';
import { UserRepository } from '../interfaces/UserRepository';

/**
 * Caso de uso para obtener usuarios con paginación
 */
export class GetUsersPaginatedUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
  }> {
    try {
      if (page < 1) {
        throw new Error('El número de página debe ser mayor a 0');
      }

      if (limit < 1) {
        throw new Error('El límite debe ser mayor a 0');
      }

      return await this.userRepository.getUsersPaginated(page, limit);
    } catch (error) {
      throw new Error(
        `Error al obtener usuarios paginados: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }
}
