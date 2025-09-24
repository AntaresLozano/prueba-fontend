# Guía de Testing - My Expo App

Esta aplicación incluye un conjunto completo de pruebas unitarias utilizando Jest y React Testing Library.

## 🧪 Configuración de Testing

### Dependencias Instaladas

```bash
npm install --save-dev @testing-library/react-native@^12.8.0 jest @types/jest --legacy-peer-deps
```

### Estructura de Archivos de Testing

```
src/
├── __tests__/
│   ├── domain/
│   │   └── User.test.ts                    # Pruebas de entidades de dominio
│   ├── use-cases/
│   │   ├── GetUsersUseCase.test.ts        # Pruebas de casos de uso
│   │   └── SearchUsersUseCase.test.ts
│   ├── ui/
│   │   ├── components/
│   │   │   ├── UserCard.test.tsx          # Pruebas de componentes UI
│   │   │   ├── LoadingSpinner.test.tsx
│   │   │   └── ErrorMessage.test.tsx
│   │   ├── hooks/
│   │   │   └── useTheme.test.tsx          # Pruebas de hooks personalizados
│   │   └── screens/
│   │       └── UsersListScreen.test.tsx   # Pruebas de pantallas
│   └── utils/
│       └── test-utils.tsx                 # Utilidades de testing
├── jest.config.js                         # Configuración de Jest
└── jest.setup.js                          # Setup global de Jest
```

## 🚀 Comandos de Testing

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar pruebas para CI
npm run test:ci

# Ejecutar pruebas específicas
npx jest src/__tests__/domain/
npx jest src/__tests__/use-cases/
npx jest --testPathPatterns="domain|use-cases"
```

## 📋 Tipos de Pruebas Implementadas

### 1. Pruebas de Dominio (`domain/`)
- **User.test.ts**: Pruebas de entidades, value objects y factory
  - Validación de UserId
  - Validación de Email
  - Creación de usuarios con UserFactory
  - Manejo de errores de validación

### 2. Pruebas de Casos de Uso (`use-cases/`)
- **GetUsersUseCase.test.ts**: Obtención de usuarios
  - Ejecución exitosa
  - Manejo de errores del repositorio
  - Casos edge (array vacío, múltiples llamadas)

- **SearchUsersUseCase.test.ts**: Búsqueda de usuarios
  - Búsqueda exitosa
  - Manejo de queries vacíos
  - Limpieza de espacios en blanco
  - Manejo de errores

### 3. Pruebas de Componentes UI (`ui/components/`)
- **UserCard.test.tsx**: Componente de tarjeta de usuario
  - Renderizado de información del usuario
  - Generación de iniciales
  - Interacción de toque
  - Manejo de nombres complejos

- **LoadingSpinner.test.tsx**: Componente de carga
  - Renderizado con/sin texto
  - Diferentes tamaños y colores

- **ErrorMessage.test.tsx**: Componente de error
  - Mostrar mensaje de error
  - Botón de reintentar
  - Manejo de mensajes largos

### 4. Pruebas de Hooks (`ui/hooks/`)
- **useTheme.test.tsx**: Hook de tema
  - Estado del tema (claro/oscuro)
  - Funciones de utilidad de colores
  - Acciones de cambio de tema

### 5. Pruebas de Pantallas (`ui/screens/`)
- **UsersListScreen.test.tsx**: Pantalla principal
  - Renderizado de lista de usuarios
  - Estados de carga y error
  - Interacciones del usuario
  - Modo claro/oscuro

## 🔧 Configuración

### Jest Configuration (`jest.config.js`)
```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts'
  ],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js']
};
```

### Setup Global (`jest.setup.js`)
- Mocks de AsyncStorage
- Mocks de Expo (constants, status-bar, vector-icons)
- Mocks de React Navigation
- Mocks de react-native-reanimated y gesture-handler

## 🎯 Utilidades de Testing (`test-utils.tsx`)

### Datos Mock
```typescript
export const mockUser: User = {
  id: 1,
  name: 'Juan Pérez',
  username: 'juanperez',
  email: 'juan@example.com',
  // ... más propiedades
};
```

### Wrapper Personalizado
```typescript
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </ThemeProvider>
  );
};
```

### Funciones Helper
- `createMockNavigation()`: Mock de navegación
- `createMockRoute()`: Mock de rutas
- `mockFetch()`: Mock de API calls
- `waitForElement()`: Esperar elementos asincrónicos

## 📊 Cobertura de Testing

Las pruebas cubren:
- ✅ **Dominio**: Entidades, value objects, factory
- ✅ **Casos de Uso**: Lógica de negocio
- ✅ **Componentes UI**: Renderizado e interacciones
- ✅ **Hooks**: Estado y efectos
- ✅ **Pantallas**: Integración de componentes
- ⚠️ **Infraestructura**: Parcialmente (mocks)

## 🚨 Problemas Conocidos

1. **Warning de moduleNameMapping**: Configuración de Jest que necesita corrección
2. **Mocks de React Native**: Algunos componentes necesitan mocks más específicos
3. **Testing de Infraestructura**: Los repositorios y servicios externos necesitan pruebas de integración

## 🔄 Próximos Pasos

1. Agregar pruebas de integración
2. Implementar pruebas E2E con Detox
3. Mejorar cobertura de código
4. Agregar pruebas de rendimiento
5. Configurar CI/CD con testing automatizado

## 📖 Mejores Prácticas

1. **AAA Pattern**: Arrange, Act, Assert
2. **Descriptive Test Names**: Nombres descriptivos en español
3. **Mock External Dependencies**: Mockear dependencias externas
4. **Test Isolation**: Cada prueba debe ser independiente
5. **Edge Cases**: Probar casos límite y errores
6. **Single Responsibility**: Una prueba por comportamiento
