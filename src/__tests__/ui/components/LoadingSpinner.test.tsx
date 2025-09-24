import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingSpinner } from '../../../ui/components/LoadingSpinner';

// Mock del hook useTheme
jest.mock('../../../ui/hooks/useTheme', () => ({
  useTheme: () => ({
    getThemeClasses: jest.fn((light, dark) => light),
  }),
}));

describe('LoadingSpinner', () => {
  it('debería renderizar el spinner por defecto', () => {
    const { UNSAFE_getByType } = render(<LoadingSpinner />);
    
    // ActivityIndicator se renderiza como componente
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });

  it('debería renderizar con texto personalizado', () => {
    const customText = 'Cargando usuarios...';
    const { getByText } = render(<LoadingSpinner text={customText} />);
    
    expect(getByText(customText)).toBeTruthy();
  });

  it('debería renderizar sin texto cuando no se proporciona', () => {
    const { queryByText } = render(<LoadingSpinner />);
    
    expect(queryByText('Cargando usuarios...')).toBeNull();
  });

  it('debería renderizar con tamaño pequeño', () => {
    const { UNSAFE_getByType } = render(<LoadingSpinner size="small" />);
    
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });

  it('debería renderizar con tamaño grande', () => {
    const { UNSAFE_getByType } = render(<LoadingSpinner size="large" />);
    
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });

  it('debería renderizar con color personalizado', () => {
    const customColor = '#ff0000';
    const { UNSAFE_getByType } = render(<LoadingSpinner color={customColor} />);
    
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });
});