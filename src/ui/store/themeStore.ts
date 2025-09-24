import { create } from 'zustand';
import { ManageThemeUseCase } from '../../use-cases/ManageThemeUseCase';
import { AsyncStorageThemeRepository } from '../../infrastructure/AsyncStorageThemeRepository';

interface ThemeState {
  // Estado
  isDarkMode: boolean;
  isLoading: boolean;
  error: string | null;

  // Acciones
  toggleTheme: () => Promise<void>;
  setTheme: (isDark: boolean) => Promise<void>;
  initializeTheme: () => Promise<void>;
  clearError: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => {
  const themeRepository = new AsyncStorageThemeRepository();
  const manageThemeUseCase = new ManageThemeUseCase(themeRepository);

  return {
    // Estado inicial
    isDarkMode: false,
    isLoading: false,
    error: null,

    // Acciones
    toggleTheme: async () => {
      try {
        set({ isLoading: true, error: null });
        const newTheme = await manageThemeUseCase.toggleTheme();
        set({ isDarkMode: newTheme === 'dark', isLoading: false });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Error al alternar tema',
          isLoading: false,
        });
      }
    },

    setTheme: async (isDark: boolean) => {
      try {
        set({ isLoading: true, error: null });
        await manageThemeUseCase.setTheme(isDark ? 'dark' : 'light');
        set({ isDarkMode: isDark, isLoading: false });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Error al establecer tema',
          isLoading: false,
        });
      }
    },

    initializeTheme: async () => {
      try {
        set({ isLoading: true, error: null });
        const currentTheme = await manageThemeUseCase.getCurrentTheme();
        set({ isDarkMode: currentTheme === 'dark', isLoading: false });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Error al inicializar tema',
          isLoading: false,
        });
      }
    },

    clearError: () => set({ error: null }),
  };
});
