/**
 * Interfaz para el repositorio de tema
 */
export interface ThemeRepository {
  /**
   * Obtiene el tema actual
   */
  getTheme(): Promise<'light' | 'dark'>;

  /**
   * Establece el tema
   * @param theme - Tema a establecer
   */
  setTheme(theme: 'light' | 'dark'): Promise<void>;

  /**
   * Alterna entre tema claro y oscuro
   */
  toggleTheme(): Promise<'light' | 'dark'>;
}
