import { SearchUsersUseCase } from '../../use-cases/SearchUsersUseCase';
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

describe('SearchUsersUseCase', () => {
  let mockUserRepository: jest.Mocked<UserRepository>;
  let searchUsersUseCase: SearchUsersUseCase;

  beforeEach(() => {
    mockUserRepository = {
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      searchUsers: jest.fn(),
      getUsersPaginated: jest.fn(),
    } as jest.Mocked<UserRepository>;

    searchUsersUseCase = new SearchUsersUseCase(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería buscar usuarios exitosamente', async () => {
    // Arrange
    const query = 'Juan';
    const expectedResults = [mockUsers[0]];
    mockUserRepository.searchUsers.mockResolvedValue(expectedResults);

    // Act
    const result = await searchUsersUseCase.execute(query);

    // Assert
    expect(result).toEqual(expectedResults);
    expect(mockUserRepository.searchUsers).toHaveBeenCalledWith(query);
    expect(mockUserRepository.searchUsers).toHaveBeenCalledTimes(1);
  });

  it('debería lanzar error cuando el repositorio falla', async () => {
    // Arrange
    const query = 'Juan';
    const errorMessage = 'Error de búsqueda';
    mockUserRepository.searchUsers.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(searchUsersUseCase.execute(query)).rejects.toThrow(
      `Error al buscar usuarios: ${errorMessage}`
    );
    expect(mockUserRepository.searchUsers).toHaveBeenCalledWith(query);
  });

  it('debería manejar búsquedas con query vacío', async () => {
    // Arrange
    const query = '';

    // Act
    const result = await searchUsersUseCase.execute(query);

    // Assert
    expect(result).toEqual([]);
    // No debería llamar al repositorio con query vacío
    expect(mockUserRepository.searchUsers).not.toHaveBeenCalled();
  });

  it('debería manejar búsquedas con espacios en blanco', async () => {
    // Arrange
    const query = '   Juan   ';
    const expectedResults = [mockUsers[0]];
    mockUserRepository.searchUsers.mockResolvedValue(expectedResults);

    // Act
    const result = await searchUsersUseCase.execute(query);

    // Assert
    expect(result).toEqual(expectedResults);
    // Debería llamar al repositorio con el query limpio (trimmed)
    expect(mockUserRepository.searchUsers).toHaveBeenCalledWith('Juan');
  });

  it('debería retornar array vacío cuando no hay resultados', async () => {
    // Arrange
    const query = 'UsuarioInexistente';
    mockUserRepository.searchUsers.mockResolvedValue([]);

    // Act
    const result = await searchUsersUseCase.execute(query);

    // Assert
    expect(result).toEqual([]);
    expect(mockUserRepository.searchUsers).toHaveBeenCalledWith(query);
  });

  it('debería manejar errores no Error correctamente', async () => {
    // Arrange
    const query = 'Juan';
    const unknownError = 'Error desconocido';
    mockUserRepository.searchUsers.mockRejectedValue(unknownError);

    // Act & Assert
    await expect(searchUsersUseCase.execute(query)).rejects.toThrow(
      'Error al buscar usuarios: Error desconocido'
    );
  });
});
