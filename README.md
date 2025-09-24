# 📱 App Usuarios Home Power

Una aplicación React Native que implementa **Clean Architecture** y **principios SOLID** para gestionar usuarios obtenidos de una API externa con funcionalidades de búsqueda, paginación y caché local.

## 🚀 Características

- ✅ **Clean Architecture** con separación clara de capas
- ✅ **Principios SOLID** aplicados correctamente
- ✅ **Búsqueda de usuarios** en tiempo real
- ✅ **Paginación** con carga incremental
- ✅ **Caché local** con AsyncStorage
- ✅ **Tema claro/oscuro** configurable
- ✅ **Animaciones fluidas** con Reanimated
- ✅ **Testing completo** con Jest
- ✅ **TypeScript** para tipado estático
- ✅ **Tailwind CSS** para estilos

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git**

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/AntaresLozano/prueba-fontend/tree/antaresLozano
cd my-expo-app
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno (opcional)

Si necesitas configurar variables de entorno, crea un archivo `.env` en la raíz del proyecto:

```env
API_BASE_URL=https://jsonplaceholder.typicode.com
CACHE_TTL=300
```

## 🏃‍♂️ Ejecutar la Aplicación

### Opción 1: Expo Go (Recomendado para desarrollo)

1. **Instalar Expo Go** en tu dispositivo móvil:
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   # o
   yarn start
   ```

3. **Escanear el código QR** que aparece en la terminal con:
   - **Android**: App Expo Go
   - **iOS**: Cámara del iPhone

### Opción 2: Emulador/Simulador

#### Android:
```bash
npm run android
# o
yarn android
```

#### iOS:
```bash
npm run ios
# o
yarn ios
```

### Opción 3: Navegador Web
```bash
npm run web
# o
yarn web
```

## 📱 Scripts Disponibles

```bash
# Desarrollo
npm start          # Inicia el servidor de desarrollo
npm run android    # Ejecuta en Android
npm run ios        # Ejecuta en iOS
npm run web        # Ejecuta en navegador web

# Testing
npm test           # Ejecuta tests una vez
npm run test:watch # Ejecuta tests en modo watch
npm run test:coverage # Ejecuta tests con cobertura

# Calidad de código
npm run lint       # Verifica linting
npm run format     # Formatea el código
```

## 🏗️ Estructura del Proyecto

```
src/
├── domain/           # Entidades y lógica de negocio
│   ├── User.ts      # Entidad principal + Value Objects + Factory
│   └── index.ts     # Exports del dominio
├── interfaces/       # Contratos y abstracciones
│   ├── UserRepository.ts
│   ├── CacheRepository.ts
│   ├── ThemeRepository.ts
│   └── index.ts
├── infrastructure/   # Implementaciones concretas
│   ├── UserApiRepository.ts
│   ├── CachedUserRepository.ts
│   ├── AsyncStorageCacheRepository.ts
│   ├── AsyncStorageThemeRepository.ts
│   └── index.ts
├── use-cases/        # Casos de uso de la aplicación
│   ├── GetUsersUseCase.ts
│   ├── GetUserByIdUseCase.ts
│   ├── SearchUsersUseCase.ts
│   ├── GetUsersPaginatedUseCase.ts
│   ├── ManageThemeUseCase.ts
│   └── index.ts
└── ui/              # Capa de presentación
    ├── components/  # Componentes reutilizables
    ├── hooks/       # Hooks personalizados
    ├── screens/     # Pantallas de la aplicación
    ├── store/       # Estado global (Zustand)
    └── index.ts
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests unitarios
npm test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage
```

## 🎨 Tecnologías Utilizadas

### Frontend
- **React Native** - Framework móvil
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React Native Reanimated** - Animaciones

### Estado y Navegación
- **Zustand** - Estado global
- **React Navigation** - Navegación

### Almacenamiento
- **AsyncStorage** - Almacenamiento local

### Testing
- **Jest** - Framework de testing
- **React Native Testing Library** - Testing de componentes

### Herramientas de Desarrollo
- **ESLint** - Linting
- **Prettier** - Formateo de código
- **TypeScript** - Verificación de tipos

## 🔧 Configuración de Desarrollo

### VS Code (Recomendado)

Instala las siguientes extensiones:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "expo.vscode-expo-tools"
  ]
}
```

### Configuración de ESLint y Prettier

El proyecto ya incluye configuración optimizada para:
- TypeScript
- React Native
- Tailwind CSS
- Clean Architecture

## 🐛 Solución de Problemas

### Error: "Metro bundler not found"
```bash
npm install -g @expo/cli
expo install --fix
```

### Error: "Unable to resolve module"
```bash
npm install
# o
yarn install
npx expo install --fix
```

### Error: "Android SDK not found"
1. Instala Android Studio
2. Configura ANDROID_HOME en variables de entorno
3. Añade Android SDK tools al PATH

### Error: "iOS Simulator not found"
1. Instala Xcode desde App Store
2. Ejecuta: `sudo xcode-select --install`

### Problemas con caché
```bash
# Limpiar caché de npm
npm cache clean --force

# Limpiar caché de Expo
expo r -c

# Limpiar caché de Metro
npx react-native start --reset-cache
```

## 📚 Documentación Adicional

- [Documentación de Arquitectura](./ARQUITECTURA_Y_FLUJO.md) - Explicación detallada de Clean Architecture y principios SOLID
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autor

Desarrollado con ❤️ implementando Clean Architecture y principios SOLID.

---

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de [Solución de Problemas](#-solución-de-problemas)
2. Consulta la [Documentación de Arquitectura](./ARQUITECTURA_Y_FLUJO.md)
3. Abre un [Issue](../../issues) en GitHub

¡Disfruta desarrollando! 🚀
