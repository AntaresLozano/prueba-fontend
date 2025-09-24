/**
 * Interfaz para el repositorio de caché
 */
export interface CacheRepository {
  /**
   * Guarda un valor en el caché
   * @param key - Clave del caché
   * @param value - Valor a guardar
   * @param ttl - Tiempo de vida en segundos (opcional)
   */
  set(key: string, value: any, ttl?: number): Promise<void>;

  /**
   * Obtiene un valor del caché
   * @param key - Clave del caché
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Elimina un valor del caché
   * @param key - Clave del caché
   */
  delete(key: string): Promise<void>;

  /**
   * Limpia todo el caché
   */
  clear(): Promise<void>;

  /**
   * Verifica si existe una clave en el caché
   * @param key - Clave del caché
   */
  has(key: string): Promise<boolean>;
}
