import { User } from '../domain/User';
import { UserRepository } from '../interfaces/UserRepository';
import { CacheRepository } from '../interfaces/CacheRepository';

/**
 * Repositorio de usuarios con caché
 * Implementa el patrón Decorator para agregar funcionalidad de caché
 */
export class CachedUserRepository implements UserRepository {
  constructor(
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  private readonly CACHE_TTL = 300; // 5 minutos
  private readonly USERS_CACHE_KEY = 'users_all';
  private readonly USER_CACHE_KEY_PREFIX = 'user_';
  private readonly SEARCH_CACHE_KEY_PREFIX = 'search_';

  async getAllUsers(): Promise<User[]> {
    try {
      // Intentar obtener del caché
      const cachedUsers = await this.cacheRepository.get<User[]>(this.USERS_CACHE_KEY);
      if (cachedUsers) {
        return cachedUsers;
      }

      // Si no está en caché, obtener de la API
      const users = await this.userRepository.getAllUsers();

      // Guardar en caché
      await this.cacheRepository.set(this.USERS_CACHE_KEY, users, this.CACHE_TTL);

      return users;
    } catch (error) {
      throw new Error(
        `Error en repositorio con caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const cacheKey = `${this.USER_CACHE_KEY_PREFIX}${id}`;

      // Intentar obtener del caché
      const cachedUser = await this.cacheRepository.get<User>(cacheKey);
      if (cachedUser) {
        return cachedUser;
      }

      // Si no está en caché, obtener de la API
      const user = await this.userRepository.getUserById(id);

      // Guardar en caché si existe
      if (user) {
        await this.cacheRepository.set(cacheKey, user, this.CACHE_TTL);
      }

      return user;
    } catch (error) {
      throw new Error(
        `Error al obtener usuario por ID con caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      const cacheKey = `${this.SEARCH_CACHE_KEY_PREFIX}${query.toLowerCase()}`;

      // Intentar obtener del caché
      const cachedResults = await this.cacheRepository.get<User[]>(cacheKey);
      if (cachedResults) {
        return cachedResults;
      }

      // Si no está en caché, buscar en la API
      const results = await this.userRepository.searchUsers(query);

      // Guardar en caché
      await this.cacheRepository.set(cacheKey, results, this.CACHE_TTL);

      return results;
    } catch (error) {
      throw new Error(
        `Error al buscar usuarios con caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
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
      const cacheKey = `users_paginated_${page}_${limit}`;

      // Intentar obtener del caché
      const cachedResults = await this.cacheRepository.get<{
        users: User[];
        total: number;
        page: number;
        totalPages: number;
        hasNextPage: boolean;
      }>(cacheKey);

      if (cachedResults) {
        return cachedResults;
      }

      // Si no está en caché, obtener de la API
      const results = await this.userRepository.getUsersPaginated(page, limit);

      // Guardar en caché
      await this.cacheRepository.set(cacheKey, results, this.CACHE_TTL);

      return results;
    } catch (error) {
      throw new Error(
        `Error al obtener usuarios paginados con caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  /**
   * Limpia el caché de usuarios
   */
  async clearCache(): Promise<void> {
    try {
      await this.cacheRepository.clear();
    } catch (error) {
      throw new Error(
        `Error al limpiar caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }
}
