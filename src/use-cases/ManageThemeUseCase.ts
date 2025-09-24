import { ThemeRepository } from '../interfaces/ThemeRepository';

/**
 * Caso de uso para gestionar el tema de la aplicación
 */
export class ManageThemeUseCase {
  constructor(private themeRepository: ThemeRepository) {}

  async getCurrentTheme(): Promise<'light' | 'dark'> {
    try {
      return await this.themeRepository.getTheme();
    } catch (error) {
      throw new Error(
        `Error al obtener tema actual: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async setTheme(theme: 'light' | 'dark'): Promise<void> {
    try {
      await this.themeRepository.setTheme(theme);
    } catch (error) {
      throw new Error(
        `Error al establecer tema: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }

  async toggleTheme(): Promise<'light' | 'dark'> {
    try {
      return await this.themeRepository.toggleTheme();
    } catch (error) {
      throw new Error(
        `Error al alternar tema: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    }
  }
}
