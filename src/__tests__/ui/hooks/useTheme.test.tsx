import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { useTheme } from '../../../ui/hooks/useTheme';
import { ThemeProvider } from '../../../ui/providers/ThemeProvider';
import { useThemeStore } from '../../../ui/store/themeStore';

// Mock del store de tema
jest.mock('../../../ui/store/themeStore');
const mockUseThemeStore = useThemeStore as jest.MockedFunction<typeof useThemeStore>;

describe('useTheme', () => {
  const mockStore = {
    isDarkMode: false,
    isLoading: false,
    error: null,
    toggleTheme: jest.fn(),
    setTheme: jest.fn(),
    initializeTheme: jest.fn(),
    clearError: jest.fn(),
  };

  beforeEach(() => {
    mockUseThemeStore.mockReturnValue(mockStore);
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it('debería retornar el estado del tema correctamente', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.isDarkMode).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('debería retornar las funciones del tema', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(typeof result.current.toggleTheme).toBe('function');
    expect(typeof result.current.setTheme).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
    expect(typeof result.current.getThemeClasses).toBe('function');
    expect(typeof result.current.getBackgroundColor).toBe('function');
    expect(typeof result.current.getTextColor).toBe('function');
    expect(typeof result.current.getBorderColor).toBe('function');
    expect(typeof result.current.getCardBackgroundColor).toBe('function');
  });

  it('debería retornar clases de tema correctas en modo claro', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.getThemeClasses('text-black', 'text-white')).toBe('text-black');
    expect(result.current.getBackgroundColor()).toBe('bg-gray-50');
    expect(result.current.getTextColor()).toBe('text-gray-900');
    expect(result.current.getBorderColor()).toBe('border-gray-200');
    expect(result.current.getCardBackgroundColor()).toBe('bg-white');
  });

  it('debería retornar clases de tema correctas en modo oscuro', () => {
    mockUseThemeStore.mockReturnValue({
      ...mockStore,
      isDarkMode: true,
    });

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.getThemeClasses('text-black', 'text-white')).toBe('text-white');
    expect(result.current.getBackgroundColor()).toBe('bg-gray-900');
    expect(result.current.getTextColor()).toBe('text-white');
    expect(result.current.getBorderColor()).toBe('border-gray-700');
    expect(result.current.getCardBackgroundColor()).toBe('bg-gray-800');
  });

  it('debería llamar toggleTheme cuando se ejecuta', async () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    await act(async () => {
      await result.current.toggleTheme();
    });

    expect(mockStore.toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('debería llamar setTheme cuando se ejecuta', async () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    await act(async () => {
      await result.current.setTheme(true);
    });

    expect(mockStore.setTheme).toHaveBeenCalledWith(true);
  });

  it('debería llamar clearError cuando se ejecuta', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.clearError();
    });

    expect(mockStore.clearError).toHaveBeenCalledTimes(1);
  });

  it('debería manejar estado de carga', () => {
    mockUseThemeStore.mockReturnValue({
      ...mockStore,
      isLoading: true,
    });

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });

  it('debería manejar errores', () => {
    const errorMessage = 'Error al cargar el tema';
    mockUseThemeStore.mockReturnValue({
      ...mockStore,
      error: errorMessage,
    });

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.error).toBe(errorMessage);
  });
});