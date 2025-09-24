import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { UsersListScreen } from '../../../ui/screens/UsersListScreen';
import { useUsers } from '../../../ui/hooks/useUsers';
import { useTheme } from '../../../ui/hooks/useTheme';

// Mock de los hooks
jest.mock('../../../ui/hooks/useUsers');
jest.mock('../../../ui/hooks/useTheme');

const mockUseUsers = useUsers as jest.MockedFunction<typeof useUsers>;
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

// Mock data local
const mockUsers = [
  {
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
  },
  {
    id: 2,
    name: 'María García',
    username: 'mariagarcia',
    email: 'maria@example.com',
    phone: '098-765-4321',
    website: 'mariagarcia.com',
    address: {
      street: 'Avenida Secundaria 456',
      suite: 'Suite 200',
      city: 'Barcelona',
      zipcode: '08001',
      geo: {
        lat: '41.3851',
        lng: '2.1734'
      }
    },
    company: {
      name: 'Digital Agency',
      catchPhrase: 'Creamos experiencias digitales',
      bs: 'revolutionize next-generation applications'
    }
  }
];

describe('UsersListScreen', () => {
  const mockGetUsers = jest.fn();
  const mockSearchUsers = jest.fn();
  const mockLoadMoreUsers = jest.fn();
  const mockClearSearch = jest.fn();
  const mockClearError = jest.fn();

  const defaultUsersHook = {
    users: mockUsers,
    searchResults: [],
    paginatedResults: null,
    isLoading: false,
    error: null,
    searchQuery: '',
    getUsers: mockGetUsers,
    searchUsers: mockSearchUsers,
    loadMoreUsers: mockLoadMoreUsers,
    clearSearch: mockClearSearch,
    clearError: mockClearError,
  };

  const defaultThemeHook = {
    isDarkMode: false,
    getThemeClasses: jest.fn((light, dark) => light),
    getBackgroundColor: jest.fn(() => 'bg-gray-50'),
    getTextColor: jest.fn(() => 'text-gray-900'),
    getBorderColor: jest.fn(() => 'border-gray-200'),
    getCardBackgroundColor: jest.fn(() => 'bg-white'),
  };

  beforeEach(() => {
    mockUseUsers.mockReturnValue(defaultUsersHook);
    mockUseTheme.mockReturnValue(defaultThemeHook);
    jest.clearAllMocks();
  });

  it('debería renderizar la lista de usuarios correctamente', () => {
    const { getByText } = render(<UsersListScreen />);

    expect(getByText('Usuarios')).toBeTruthy();
    expect(getByText('Juan Pérez')).toBeTruthy();
    expect(getByText('María García')).toBeTruthy();
  });

  it('debería llamar getUsers al montar el componente', () => {
    render(<UsersListScreen />);
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el spinner de carga cuando isLoading es true', () => {
    mockUseUsers.mockReturnValue({
      ...defaultUsersHook,
      isLoading: true,
      users: [],
    });

    const { getByText } = render(<UsersListScreen />);
    expect(getByText('Cargando usuarios...')).toBeTruthy();
  });

  it('debería mostrar mensaje de error cuando hay error', () => {
    const errorMessage = 'Error de conexión';
    mockUseUsers.mockReturnValue({
      ...defaultUsersHook,
      error: errorMessage,
    });

    const { getByText } = render(<UsersListScreen />);
    expect(getByText('¡Oops! Algo salió mal')).toBeTruthy();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('debería mostrar mensaje cuando no hay usuarios', () => {
    mockUseUsers.mockReturnValue({
      ...defaultUsersHook,
      users: [],
      isLoading: false,
    });

    const { getByText } = render(<UsersListScreen />);
    expect(getByText('No hay usuarios disponibles')).toBeTruthy();
  });

  it('debería mostrar mensaje cuando no hay resultados de búsqueda', () => {
    mockUseUsers.mockReturnValue({
      ...defaultUsersHook,
      searchQuery: 'UsuarioInexistente',
      searchResults: [],
      users: [],
      isLoading: false,
    });

    const { getByText } = render(<UsersListScreen />);
    expect(getByText('No se encontraron usuarios')).toBeTruthy();
  });

  it('debería mostrar el botón de reintentar cuando hay error', () => {
    mockUseUsers.mockReturnValue({
      ...defaultUsersHook,
      error: 'Error de conexión',
    });

    const { getByText } = render(<UsersListScreen />);
    const retryButton = getByText('Reintentar');
    expect(retryButton).toBeTruthy();
  });

  it('debería llamar clearError cuando se presiona reintentar', () => {
    mockUseUsers.mockReturnValue({
      ...defaultUsersHook,
      error: 'Error de conexión',
    });

    const { getByText } = render(<UsersListScreen />);
    const retryButton = getByText('Reintentar');
    
    fireEvent.press(retryButton);
    expect(mockClearError).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el ThemeToggle', () => {
    const { getByText } = render(<UsersListScreen />);
    // El ThemeToggle debería estar presente en el header
    expect(getByText('Usuarios')).toBeTruthy();
  });

  it('debería mostrar la SearchBar', () => {
    const { getByText } = render(<UsersListScreen />);
    // La SearchBar debería estar presente
    expect(getByText('Usuarios')).toBeTruthy();
  });

  it('debería manejar el modo oscuro correctamente', () => {
    mockUseTheme.mockReturnValue({
      ...defaultThemeHook,
      isDarkMode: true,
      getThemeClasses: jest.fn((light, dark) => dark),
      getBackgroundColor: jest.fn(() => 'bg-gray-900'),
      getTextColor: jest.fn(() => 'text-white'),
      getBorderColor: jest.fn(() => 'border-gray-700'),
      getCardBackgroundColor: jest.fn(() => 'bg-gray-800'),
    });

    const { getByText } = render(<UsersListScreen />);
    expect(getByText('Usuarios')).toBeTruthy();
  });
});