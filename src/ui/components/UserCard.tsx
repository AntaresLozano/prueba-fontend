import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../domain/User';
import { useTheme } from '../hooks/useTheme';

interface UserCardProps {
  user: User;
  onPress: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const { getThemeClasses, getCardBackgroundColor, getBorderColor, getTextColor } = useTheme();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(user)}
      className={`mx-4 mb-3 rounded-lg border ${getBorderColor()} ${getCardBackgroundColor()} p-4 shadow-sm`}
      activeOpacity={0.7}>
      <View className="flex-row items-center">
        {/* Avatar */}
        <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-blue-500">
          <Text className="text-lg font-bold text-white">{getInitials(user.name)}</Text>
        </View>

        {/* User Info */}
        <View className="flex-1">
          <Text className={`mb-1 text-lg font-semibold ${getTextColor()}`}>
            {user.name}
          </Text>
          <Text className={`mb-1 text-sm ${getThemeClasses('text-gray-600', 'text-gray-300')}`}>@{user.username}</Text>
          <Text className={`text-sm ${getThemeClasses('text-gray-500', 'text-gray-400')}`}>{user.email}</Text>
        </View>

        {/* Arrow */}
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
};
