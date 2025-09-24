import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../../ui/providers/ThemeProvider';
import { User } from '../../domain/User';

// Mock data para testing
export const mockUser: User = {
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

export const mockUsers: User[] = [
  mockUser,
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

// Wrapper personalizado para testing con providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </ThemeProvider>
  );
};

// Función de render personalizada
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-exportar todo
export * from '@testing-library/react-native';
export { customRender as render };

// Utilidades adicionales para testing
export const createMockNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  canGoBack: jest.fn(() => true),
  isFocused: jest.fn(() => true),
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

export const createMockRoute = (params = {}) => ({
  key: 'test-route',
  name: 'TestScreen',
  params,
});

// Mock de fetch para testing de APIs
export const mockFetch = (data: any, status = 200) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    })
  ) as jest.Mock;
};

// Helper para esperar que un elemento aparezca
export const waitForElement = async (getByTestId: any, testId: string, timeout = 1000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      return getByTestId(testId);
    } catch {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  throw new Error(`Element with testID "${testId}" not found within ${timeout}ms`);
};

// Prueba simple para que el archivo no falle
describe('test-utils', () => {
  it('debería exportar las utilidades correctamente', () => {
    expect(mockUser).toBeDefined();
    expect(mockUsers).toBeDefined();
    expect(createMockNavigation).toBeDefined();
    expect(createMockRoute).toBeDefined();
    expect(mockFetch).toBeDefined();
    expect(waitForElement).toBeDefined();
  });
});