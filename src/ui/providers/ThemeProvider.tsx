import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/themeStore';

interface ThemeContextType {
  isDarkMode: boolean;
  isLoading: boolean;
  error: string | null;
  toggleTheme: () => Promise<void>;
  setTheme: (isDark: boolean) => Promise<void>;
  clearError: () => void;
  // Utilidades para clases de Tailwind
  getThemeClasses: (lightClasses: string, darkClasses: string) => string;
  getBackgroundColor: () => string;
  getTextColor: () => string;
  getBorderColor: () => string;
  getCardBackgroundColor: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { isDarkMode, isLoading, error, toggleTheme, setTheme, initializeTheme, clearError } = useThemeStore();
  const systemColorScheme = useColorScheme();

  // Inicializar tema al montar el provider
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Función para obtener clases de Tailwind condicionales
  const getThemeClasses = (lightClasses: string, darkClasses: string): string => {
    return isDarkMode ? darkClasses : lightClasses;
  };

  // Funciones de utilidad para colores comunes
  const getBackgroundColor = (): string => {
    return isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  };

  const getTextColor = (): string => {
    return isDarkMode ? 'text-white' : 'text-gray-900';
  };

  const getBorderColor = (): string => {
    return isDarkMode ? 'border-gray-700' : 'border-gray-200';
  };

  const getCardBackgroundColor = (): string => {
    return isDarkMode ? 'bg-gray-800' : 'bg-white';
  };

  const contextValue: ThemeContextType = {
    isDarkMode,
    isLoading,
    error,
    toggleTheme,
    setTheme,
    clearError,
    getThemeClasses,
    getBackgroundColor,
    getTextColor,
    getBorderColor,
    getCardBackgroundColor,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext debe ser usado dentro de un ThemeProvider');
  }
  return context;
};
