import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  text,
  color = '#3b82f6',
}) => {
  const { getThemeClasses } = useTheme();

  return (
    <View className="flex-1 items-center justify-center p-8">
      <ActivityIndicator size={size} color={color} />
      {text && <Text className={`mt-4 text-center ${getThemeClasses('text-gray-600', 'text-gray-300')}`}>{text}</Text>}
    </View>
  );
};
