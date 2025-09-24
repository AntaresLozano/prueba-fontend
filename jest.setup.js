// Mock básico de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock de expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        apiUrl: 'https://jsonplaceholder.typicode.com'
      }
    }
  }
}));

// Mock de expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar'
}));

// Mock de @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons'
}));

// Mock de react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock de react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {});

// Mock de @react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: 'Navigator',
    Screen: 'Screen',
  }),
}));

// Configuración global para tests
global.console = {
  ...console,
  // Suprimir warnings en tests
  warn: jest.fn(),
  error: jest.fn(),
};