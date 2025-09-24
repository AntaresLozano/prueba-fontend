import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ErrorMessage } from '../../../ui/components/ErrorMessage';

// Mock del hook useTheme
jest.mock('../../../ui/hooks/useTheme', () => ({
  useTheme: () => ({
    getThemeClasses: jest.fn((light, dark) => light),
    getTextColor: jest.fn(() => 'text-gray-900'),
  }),
}));

describe('ErrorMessage', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    mockOnRetry.mockClear();
  });

  it('debería renderizar el mensaje de error', () => {
    const errorMessage = 'Error de conexión';
    const { getByText } = render(
      <ErrorMessage message={errorMessage} />
    );

    expect(getByText('¡Oops! Algo salió mal')).toBeTruthy();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('debería mostrar el botón de reintentar cuando se proporciona onRetry', () => {
    const { getByText } = render(
      <ErrorMessage message="Error de conexión" onRetry={mockOnRetry} />
    );

    const retryButton = getByText('Reintentar');
    expect(retryButton).toBeTruthy();
  });

  it('debería llamar onRetry cuando se presiona el botón de reintentar', () => {
    const { getByText } = render(
      <ErrorMessage message="Error de conexión" onRetry={mockOnRetry} />
    );

    const retryButton = getByText('Reintentar');
    fireEvent.press(retryButton);
    
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el ícono de alerta', () => {
    const { UNSAFE_getByType } = render(
      <ErrorMessage message="Error de conexión" />
    );

    // El ícono Ionicons se renderiza como componente
    expect(UNSAFE_getByType('Ionicons')).toBeTruthy();
  });

  it('debería renderizar sin botón de reintentar cuando no se proporciona onRetry', () => {
    const { queryByText } = render(
      <ErrorMessage message="Error de conexión" />
    );

    expect(queryByText('Reintentar')).toBeNull();
  });

  it('debería manejar mensajes de error largos', () => {
    const longErrorMessage = 'Este es un mensaje de error muy largo que debería ser manejado correctamente por el componente y mostrarse en múltiples líneas si es necesario';
    const { getByText } = render(
      <ErrorMessage message={longErrorMessage} />
    );

    expect(getByText(longErrorMessage)).toBeTruthy();
  });
});