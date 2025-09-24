import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UserCard } from '../../../ui/components/UserCard';

// Mock del hook useTheme
jest.mock('../../../ui/hooks/useTheme', () => ({
  useTheme: () => ({
    getThemeClasses: jest.fn((light, dark) => light),
    getCardBackgroundColor: jest.fn(() => 'bg-white'),
    getBorderColor: jest.fn(() => 'border-gray-200'),
    getTextColor: jest.fn(() => 'text-gray-900'),
  }),
}));

// Mock data local
const mockUser = {
  id: 1,
  name: 'Juan Pérez',
  username: 'juanperez',
  email: 'juan@example.com',
  phone: '123-456-7890',
  website: 'juanperez.com',
  address: {
    street: 'Calle Principal 123',
    suite: 'Apt 4B',
    city: 'Madrid',
    zipcode: '28001',
    geo: {
      lat: '40.4168',
      lng: '-3.7038'
    }
  },
  company: {
    name: 'Tech Solutions',
    catchPhrase: 'Innovación en tecnología',
    bs: 'harness real-time e-markets'
  }
};

describe('UserCard', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('debería renderizar correctamente la información del usuario', () => {
    const { getByText } = render(
      <UserCard user={mockUser} onPress={mockOnPress} />
    );

    expect(getByText('Juan Pérez')).toBeTruthy();
    expect(getByText('@juanperez')).toBeTruthy();
    expect(getByText('juan@example.com')).toBeTruthy();
  });

  it('debería mostrar las iniciales del usuario en el avatar', () => {
    const { getByText } = render(
      <UserCard user={mockUser} onPress={mockOnPress} />
    );

    expect(getByText('JP')).toBeTruthy();
  });

  it('debería llamar onPress cuando se toca la tarjeta', () => {
    const { getByText } = render(
      <UserCard user={mockUser} onPress={mockOnPress} />
    );

    // Buscar el TouchableOpacity por su contenido
    const card = getByText('Juan Pérez').parent?.parent;
    if (card) {
      fireEvent.press(card);
      expect(mockOnPress).toHaveBeenCalledWith(mockUser);
    }
  });

  it('debería manejar nombres con múltiples palabras correctamente', () => {
    const userWithLongName = {
      ...mockUser,
      name: 'María José García López'
    };

    const { getByText } = render(
      <UserCard user={userWithLongName} onPress={mockOnPress} />
    );

    expect(getByText('MJ')).toBeTruthy();
  });

  it('debería manejar nombres de una sola palabra', () => {
    const userWithSingleName = {
      ...mockUser,
      name: 'Juan'
    };

    const { getByText } = render(
      <UserCard user={userWithSingleName} onPress={mockOnPress} />
    );

    expect(getByText('J')).toBeTruthy();
  });

  it('debería mostrar el ícono de flecha', () => {
    const { UNSAFE_getByType } = render(
      <UserCard user={mockUser} onPress={mockOnPress} />
    );

    // El ícono Ionicons se renderiza como componente
    expect(UNSAFE_getByType('Ionicons')).toBeTruthy();
  });
});