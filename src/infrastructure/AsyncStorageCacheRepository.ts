import AsyncStorage from '@react-native-async-storage/async-storage';
import { CacheRepository } from '../interfaces/CacheRepository';

interface CacheItem {
  value: any;
  expiresAt?: number;
}

/**
 * Implementación del repositorio de caché usando AsyncStorage
 */
export class AsyncStorageCacheRepository implements CacheRepository {
  private readonly prefix = 'cache_';

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const cacheItem: CacheItem = {
        value,
        expiresAt: ttl ? Date.now() + ttl * 1000 : undefined,
      };

      await AsyncStorage.setItem(this.getKey(key), JSON.stringify(cacheItem));
    } catch (error) {
      throw new Error(
        `Error al guardar en caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(this.getKey(key));

      if (!item) {
        return null;
      }

      const cacheItem: CacheItem = JSON.parse(item);

      // Verificar si el item ha expirado
      if (cacheItem.expiresAt && Date.now() > cacheItem.expiresAt) {
        await this.delete(key);
        return null;
      }

      return cacheItem.value as T;
    } catch (error) {
      throw new Error(
        `Error al obtener del caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.getKey(key));
    } catch (error) {
      throw new Error(
        `Error al eliminar del caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((key) => key.startsWith(this.prefix));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      throw new Error(
        `Error al limpiar caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const item = await AsyncStorage.getItem(this.getKey(key));
      return item !== null;
    } catch (error) {
      throw new Error(
        `Error al verificar caché: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }
}
