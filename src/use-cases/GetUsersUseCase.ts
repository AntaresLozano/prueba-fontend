import { User } from '../domain/User';
import { UserRepository } from '../interfaces/UserRepository';

/**
 * Caso de uso para obtener todos los usuarios
 */
export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      throw new Error(
        `Error al obtener usuarios: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }
}
