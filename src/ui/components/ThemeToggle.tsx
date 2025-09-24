import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme, getThemeClasses } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className={`rounded-full p-2 ${getThemeClasses('bg-gray-200', 'bg-gray-700')}`}
      activeOpacity={0.7}>
      <Ionicons
        name={isDarkMode ? 'sunny' : 'moon'}
        size={24}
        color={isDarkMode ? '#fbbf24' : '#374151'}
      />
    </TouchableOpacity>
  );
};
