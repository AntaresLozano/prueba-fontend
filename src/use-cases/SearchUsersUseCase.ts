import { User } from '../domain/User';
import { UserRepository } from '../interfaces/UserRepository';

/**
 * Caso de uso para buscar usuarios
 */
export class SearchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(query: string): Promise<User[]> {
    try {
      if (!query || query.trim().length === 0) {
        return [];
      }

      return await this.userRepository.searchUsers(query.trim());
    } catch (error) {
      throw new Error(
        `Error al buscar usuarios: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }
}
