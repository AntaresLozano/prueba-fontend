import { User } from '../domain/User';
import { UserRepository } from '../interfaces/UserRepository';

/**
 * Caso de uso para obtener un usuario por su ID
 */
export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    try {
      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new Error(`Usuario con ID ${id} no encontrado`);
      }

      return user;
    } catch (error) {
      throw new Error(
        `Error al obtener usuario por ID: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }
}
