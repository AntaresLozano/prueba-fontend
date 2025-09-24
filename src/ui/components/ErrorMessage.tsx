import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const { getThemeClasses, getTextColor } = useTheme();

  return (
    <View className="flex-1 items-center justify-center p-8">
      <View className="items-center">
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" className="mb-4" />
        <Text className={`mb-4 text-center text-lg font-semibold ${getTextColor()}`}>
          ¡Oops! Algo salió mal
        </Text>
        <Text className={`mb-6 text-center ${getThemeClasses('text-gray-600', 'text-gray-300')}`}>{message}</Text>
        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            className="rounded-lg bg-blue-500 px-6 py-3"
            activeOpacity={0.7}>
            <Text className="font-semibold text-white">Reintentar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
