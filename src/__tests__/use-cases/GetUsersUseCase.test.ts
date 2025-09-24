import { GetUsersUseCase } from '../../use-cases/GetUsersUseCase';
import { UserRepository } from '../../interfaces/UserRepository';
import { User } from '../../domain/User';

// Mock data local
const mockUsers: User[] = [
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
  }
];

describe('GetUsersUseCase', () => {
  let mockUserRepository: jest.Mocked<UserRepository>;
  let getUsersUseCase: GetUsersUseCase;

  beforeEach(() => {
    mockUserRepository = {
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      searchUsers: jest.fn(),
      getUsersPaginated: jest.fn(),
    } as jest.Mocked<UserRepository>;

    getUsersUseCase = new GetUsersUseCase(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería obtener todos los usuarios exitosamente', async () => {
    // Arrange
    mockUserRepository.getAllUsers.mockResolvedValue(mockUsers);

    // Act
    const result = await getUsersUseCase.execute();

    // Assert
    expect(result).toEqual(mockUsers);
    expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(1);
  });

  it('debería lanzar error cuando el repositorio falla', async () => {
    // Arrange
    const errorMessage = 'Error de conexión';
    mockUserRepository.getAllUsers.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(getUsersUseCase.execute()).rejects.toThrow(
      `Error al obtener usuarios: ${errorMessage}`
    );
    expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores no Error correctamente', async () => {
    // Arrange
    const unknownError = 'Error desconocido';
    mockUserRepository.getAllUsers.mockRejectedValue(unknownError);

    // Act & Assert
    await expect(getUsersUseCase.execute()).rejects.toThrow(
      'Error al obtener usuarios: Error desconocido'
    );
  });

  it('debería retornar array vacío cuando no hay usuarios', async () => {
    // Arrange
    mockUserRepository.getAllUsers.mockResolvedValue([]);

    // Act
    const result = await getUsersUseCase.execute();

    // Assert
    expect(result).toEqual([]);
    expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(1);
  });

  it('debería manejar múltiples llamadas correctamente', async () => {
    // Arrange
    mockUserRepository.getAllUsers.mockResolvedValue(mockUsers);

    // Act
    const result1 = await getUsersUseCase.execute();
    const result2 = await getUsersUseCase.execute();

    // Assert
    expect(result1).toEqual(mockUsers);
    expect(result2).toEqual(mockUsers);
    expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(2);
  });
});
