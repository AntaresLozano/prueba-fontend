import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeRepository } from '../interfaces/ThemeRepository';

/**
 * Implementación del repositorio de tema usando AsyncStorage
 */
export class AsyncStorageThemeRepository implements ThemeRepository {
  private readonly themeKey = 'app_theme';

  async getTheme(): Promise<'light' | 'dark'> {
    try {
      const theme = await AsyncStorage.getItem(this.themeKey);
      return (theme as 'light' | 'dark') || 'light';
    } catch (error) {
      throw new Error(
        `Error al obtener tema: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async setTheme(theme: 'light' | 'dark'): Promise<void> {
    try {
      await AsyncStorage.setItem(this.themeKey, theme);
    } catch (error) {
      throw new Error(
        `Error al establecer tema: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async toggleTheme(): Promise<'light' | 'dark'> {
    try {
      const currentTheme = await this.getTheme();
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      await this.setTheme(newTheme);
      return newTheme;
    } catch (error) {
      throw new Error(
        `Error al alternar tema: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }
}
