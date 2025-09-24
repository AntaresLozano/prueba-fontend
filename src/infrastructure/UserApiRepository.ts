import { User, UserFactory } from '../domain/User';
import { UserRepository } from '../interfaces/UserRepository';

interface ApiUserData {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * Repositorio de usuarios que obtiene datos de la API JSONPlaceholder
 */
export class UserApiRepository implements UserRepository {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/users';

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch(this.baseUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const usersData = await response.json();
      return usersData.map((userData: ApiUserData) => UserFactory.create(userData));
    } catch (error) {
      throw new Error(
        `Error al obtener usuarios de la API: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      return UserFactory.create(userData);
    } catch (error) {
      throw new Error(
        `Error al obtener usuario por ID: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      const allUsers = await this.getAllUsers();
      const searchTerm = query.toLowerCase();

      return allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm) ||
          user.company.name.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      throw new Error(
        `Error al buscar usuarios: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async getUsersPaginated(
    page: number,
    limit: number
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
  }> {
    try {
      const allUsers = await this.getAllUsers();
      const total = allUsers.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const users = allUsers.slice(startIndex, endIndex);

      return {
        users,
        total,
        page,
        totalPages,
        hasNextPage: page < totalPages,
      };
    } catch (error) {
      throw new Error(
        `Error al obtener usuarios paginados: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }
}
