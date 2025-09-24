import { create } from 'zustand';
import { User } from '../../domain/User';

interface UserState {
  // Estado
  users: User[];
  selectedUser: User | null;
  searchResults: User[];
  paginatedResults: {
    users: User[];
    total: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
  } | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;

  // Acciones
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setSearchResults: (results: User[]) => void;
  setPaginatedResults: (
    results: {
      users: User[];
      total: number;
      page: number;
      totalPages: number;
      hasNextPage: boolean;
    } | null
  ) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  clearError: () => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  // Estado inicial
  users: [],
  selectedUser: null,
  searchResults: [],
  paginatedResults: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  currentPage: 1,

  // Acciones
  setUsers: (users) => set({ users }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setPaginatedResults: (paginatedResults) => set({ paginatedResults }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  clearError: () => set({ error: null }),
  reset: () =>
    set({
      users: [],
      selectedUser: null,
      searchResults: [],
      paginatedResults: null,
      isLoading: false,
      error: null,
      searchQuery: '',
      currentPage: 1,
    }),
}));
