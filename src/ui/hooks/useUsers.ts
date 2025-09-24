import { useCallback } from 'react';
import { useUserStore } from '../store/userStore';
import {
  GetUsersUseCase,
  GetUserByIdUseCase,
  SearchUsersUseCase,
  GetUsersPaginatedUseCase,
} from '../../use-cases';
import {
  UserApiRepository,
  AsyncStorageCacheRepository,
  CachedUserRepository,
} from '../../infrastructure';

// Instancias de los repositorios (en una app real, esto vendría de un contenedor de dependencias)
const apiRepository = new UserApiRepository();
const cacheRepository = new AsyncStorageCacheRepository();
const userRepository = new CachedUserRepository(apiRepository, cacheRepository);

export const useUsers = () => {
  const {
    users,
    selectedUser,
    searchResults,
    paginatedResults,
    isLoading,
    error,
    searchQuery,
    currentPage,
    setUsers,
    setSelectedUser,
    setSearchResults,
    setPaginatedResults,
    setLoading,
    setError,
    setSearchQuery,
    setCurrentPage,
    clearError,
  } = useUserStore();

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      clearError();

      const getUsersUseCase = new GetUsersUseCase(userRepository);
      const usersData = await getUsersUseCase.execute();

      setUsers(usersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [setUsers, setLoading, setError, clearError]);

  const getUserById = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        clearError();

        const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
        const user = await getUserByIdUseCase.execute(id);

        setSelectedUser(user);
        return user;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setSelectedUser, setLoading, setError, clearError]
  );

  const searchUsers = useCallback(
    async (query: string) => {
      try {
        setLoading(true);
        clearError();

        if (query.trim().length === 0) {
          setSearchQuery('');
          setSearchResults([]);
          setLoading(false);
          return;
        }

        setSearchQuery(query);
        const searchUsersUseCase = new SearchUsersUseCase(userRepository);
        const results = await searchUsersUseCase.execute(query);

        setSearchResults(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    },
    [setSearchResults, setSearchQuery, setLoading, setError, clearError]
  );

  const getUsersPaginated = useCallback(
    async (page: number = 1, limit: number = 10) => {
      try {
        setLoading(true);
        clearError();
        setCurrentPage(page);

        const getUsersPaginatedUseCase = new GetUsersPaginatedUseCase(userRepository);
        const results = await getUsersPaginatedUseCase.execute(page, limit);

        setPaginatedResults(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    },
    [setPaginatedResults, setCurrentPage, setLoading, setError, clearError]
  );

  const loadMoreUsers = useCallback(
    async (limit: number = 10) => {
      if (!paginatedResults?.hasNextPage) return;

      try {
        setLoading(true);
        clearError();

        const nextPage = currentPage + 1;
        const getUsersPaginatedUseCase = new GetUsersPaginatedUseCase(userRepository);
        const newResults = await getUsersPaginatedUseCase.execute(nextPage, limit);

        // Combinar resultados existentes con los nuevos
        const combinedResults = {
          ...newResults,
          users: [...(paginatedResults.users || []), ...newResults.users],
        };

        setPaginatedResults(combinedResults);
        setCurrentPage(nextPage);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    },
    [
      paginatedResults,
      currentPage,
      setPaginatedResults,
      setCurrentPage,
      setLoading,
      setError,
      clearError,
    ]
  );

  const clearSearch = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      setSearchQuery('');
      setSearchResults([]);
      
      // Recargar todos los usuarios
      const getUsersUseCase = new GetUsersUseCase(userRepository);
      const usersData = await getUsersUseCase.execute();
      setUsers(usersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [setUsers, setSearchQuery, setSearchResults, setLoading, setError, clearError]);

  return {
    // Estado
    users,
    selectedUser,
    searchResults,
    paginatedResults,
    isLoading,
    error,
    searchQuery,
    currentPage,

    // Acciones
    getUsers,
    getUserById,
    searchUsers,
    getUsersPaginated,
    loadMoreUsers,
    clearSearch,
    clearError,
  };
};
