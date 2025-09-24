import { useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUsers } from '../hooks/useUsers';
import { useTheme } from '../hooks/useTheme';
import { LoadingSpinner, ErrorMessage, SearchBar, UserCard, ThemeToggle } from '../components';
import { User } from '../../domain/User';

type RootStackParamList = {
  UsersList: undefined;
  UserDetail: { user: User };
};

type UsersListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UsersList'>;

export const UsersListScreen: React.FC = () => {
  const navigation = useNavigation<UsersListScreenNavigationProp>();
  const {
    users,
    searchResults,
    paginatedResults,
    isLoading,
    error,
    searchQuery,
    getUsers,
    searchUsers,
    loadMoreUsers,
    clearSearch,
    clearError,
  } = useUsers();

  const { isDarkMode, getThemeClasses, getBackgroundColor, getTextColor, getBorderColor, getCardBackgroundColor } = useTheme();

  // Cargar usuarios al montar el componente
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim().length === 0) {
        // Cuando se limpia la búsqueda, usar clearSearch
        clearSearch();
      } else {
        searchUsers(query);
      }
    },
    [clearSearch, searchUsers]
  );

  const handleRefresh = useCallback(() => {
    clearError();
    if (searchQuery.trim().length === 0) {
      clearSearch();
    } else {
      searchUsers(searchQuery);
    }
  }, [clearSearch, searchUsers, searchQuery, clearError]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && paginatedResults?.hasNextPage) {
      loadMoreUsers();
    }
  }, [isLoading, paginatedResults, loadMoreUsers]);

  const handleUserPress = useCallback(
    (user: User) => {
      navigation.navigate('UserDetail', { user });
    },
    [navigation]
  );

  const renderUser = useCallback(
    ({ item }: { item: User }) => <UserCard user={item} onPress={handleUserPress} />,
    [handleUserPress]
  );

  const renderFooter = useCallback(() => {
    if (!isLoading || !paginatedResults?.hasNextPage) return null;

    return (
      <View className="py-4">
        <LoadingSpinner size="small" text="Cargando más usuarios..." />
      </View>
    );
  }, [isLoading, paginatedResults]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;

    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className={`text-center text-lg ${getThemeClasses('text-gray-500', 'text-gray-400')}`}>
          {searchQuery.trim().length > 0
            ? 'No se encontraron usuarios'
            : 'No hay usuarios disponibles'}
        </Text>
      </View>
    );
  }, [isLoading, searchQuery]);

  if (error) {
    return (
      <SafeAreaView className={`flex-1 ${getBackgroundColor()}`}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#111827' : '#ffffff'}
        />
        <ErrorMessage message={error} onRetry={handleRefresh} />
      </SafeAreaView>
    );
  }

  const dataToShow = searchQuery.trim().length > 0 ? searchResults : users;

  return (
    <SafeAreaView className={`flex-1 ${getBackgroundColor()}`}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#f9fafb'}
      />

      {/* Header */}
      <View className={`flex-row items-center justify-between border-b ${getBorderColor()} ${getCardBackgroundColor()} p-4`}>
        <Text className={`text-2xl font-bold ${getTextColor()}`}>Usuarios</Text>
        <ThemeToggle />
      </View>

      {/* Search Bar */}
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Buscar por nombre, email o empresa..." 
        value={searchQuery}
        debounceMs={500}
      />

      {/* Users List */}
      {isLoading && dataToShow.length === 0 ? (
        <LoadingSpinner text="Cargando usuarios..." />
      ) : (
        <FlatList
          data={dataToShow}
          renderItem={renderUser}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isLoading && dataToShow.length > 0}
              onRefresh={handleRefresh}
              tintColor={isDarkMode ? '#ffffff' : '#000000'}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};
