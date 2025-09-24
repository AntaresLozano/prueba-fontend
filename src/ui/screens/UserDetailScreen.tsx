import { useEffect, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUsers } from '../hooks/useUsers';
import { useTheme } from '../hooks/useTheme';
import { LoadingSpinner, ErrorMessage, ThemeToggle } from '../components';
import { User } from '../../domain/User';

export const UserDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params as { user: User };
  const { selectedUser, getUserById, isLoading, error, clearError } = useUsers();
  const { isDarkMode, getThemeClasses, getBackgroundColor, getTextColor, getBorderColor, getCardBackgroundColor } = useTheme();

  useEffect(() => {
    if (user?.id) {
      getUserById(user.id);
    }
  }, [user?.id, getUserById]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRetry = useCallback(() => {
    clearError();
    if (user?.id) {
      getUserById(user.id);
    }
  }, [user?.id, getUserById, clearError]);

  if (error) {
    return (
      <SafeAreaView className={`flex-1 ${getBackgroundColor()}`}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#111827' : '#ffffff'}
        />
        <ErrorMessage message={error} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  if (isLoading && !selectedUser) {
    return (
      <SafeAreaView className={`flex-1 ${getBackgroundColor()}`}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#111827' : '#ffffff'}
        />
        <LoadingSpinner text="Cargando usuario..." />
      </SafeAreaView>
    );
  }

  if (!selectedUser) {
    return (
      <SafeAreaView className={`flex-1 ${getBackgroundColor()}`}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#111827' : '#ffffff'}
        />
        <View className="flex-1 items-center justify-center p-8">
          <Text className={`text-center text-lg ${getThemeClasses('text-gray-500', 'text-gray-400')}`}>
            Usuario no encontrado
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SafeAreaView className={`flex-1 ${getBackgroundColor()}`}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#f9fafb'}
      />

      <View className={`flex-row items-center justify-between border-b ${getBorderColor()} ${getCardBackgroundColor()} p-4`}>
        <TouchableOpacity onPress={handleGoBack} className="flex-row items-center">
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
          <Text className={`ml-2 text-lg font-semibold ${getTextColor()}`}>Atrás</Text>
        </TouchableOpacity>
        <ThemeToggle />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className={`mx-4 mt-6 rounded-lg border ${getBorderColor()} ${getCardBackgroundColor()} p-6 shadow-sm`}>
          <View className="mb-4 items-center">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-blue-500">
              <Text className="text-2xl font-bold text-white">
                {getInitials(selectedUser.name)}
              </Text>
            </View>
            <Text className={`mt-3 text-2xl font-bold ${getTextColor()}`}>
              {selectedUser.name}
            </Text>
            <Text className={`text-lg ${getThemeClasses('text-gray-600', 'text-gray-300')}`}>
              @{selectedUser.username}
            </Text>
          </View>

          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="mail" size={20} color="#6b7280" />
              <Text className={`ml-3 ${getThemeClasses('text-gray-700', 'text-gray-300')}`}>{selectedUser.email}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="call" size={20} color="#6b7280" />
              <Text className={`ml-3 ${getThemeClasses('text-gray-700', 'text-gray-300')}`}>{selectedUser.phone}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="globe" size={20} color="#6b7280" />
              <Text className={`ml-3 ${getThemeClasses('text-gray-700', 'text-gray-300')}`}>{selectedUser.website}</Text>
            </View>
          </View>
        </View>

        <View className={`mx-4 mt-4 rounded-lg border ${getBorderColor()} ${getCardBackgroundColor()} p-6 shadow-sm`}>
          <Text className={`mb-4 text-xl font-bold ${getTextColor()}`}>Dirección</Text>
          <View className="space-y-2">
            <Text className={getThemeClasses('text-gray-700', 'text-gray-300')}>
              {selectedUser.address.street}, {selectedUser.address.suite}
            </Text>
            <Text className={getThemeClasses('text-gray-700', 'text-gray-300')}>
              {selectedUser.address.city}, {selectedUser.address.zipcode}
            </Text>
            <Text className={getThemeClasses('text-gray-700', 'text-gray-300')}>
              Lat: {selectedUser.address.geo.lat}, Lng: {selectedUser.address.geo.lng}
            </Text>
          </View>
        </View>

        <View className={`mx-4 mb-6 mt-4 rounded-lg border ${getBorderColor()} ${getCardBackgroundColor()} p-6 shadow-sm`}>
          <Text className={`mb-4 text-xl font-bold ${getTextColor()}`}>Empresa</Text>
          <View className="space-y-2">
            <Text className={`text-lg font-semibold ${getTextColor()}`}>
              {selectedUser.company.name}
            </Text>
            <Text className={`italic ${getThemeClasses('text-gray-700', 'text-gray-300')}`}>
              "{selectedUser.company.catchPhrase}"
            </Text>
            <Text className={getThemeClasses('text-gray-600', 'text-gray-400')}>{selectedUser.company.bs}</Text>
          </View>
        </View>

        {isLoading && (
          <View className="absolute inset-0 items-center justify-center bg-black bg-opacity-50">
            <LoadingSpinner size="small" text="Actualizando..." />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
