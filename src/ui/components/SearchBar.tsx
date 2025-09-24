import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  value?: string; // Valor controlado desde el padre
  debounceMs?: number; // Tiempo de debounce en milisegundos
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Buscar...',
  initialValue = '',
  value,
  debounceMs = 300, // 300ms por defecto
}) => {
  const [query, setQuery] = useState(initialValue);
  const { getThemeClasses, getCardBackgroundColor, getBorderColor, getTextColor } = useTheme();

  // Sincronizar con el valor del padre si se proporciona
  useEffect(() => {
    if (value !== undefined) {
      setQuery(value);
    }
  }, [value]);

  // Debounce para evitar demasiadas llamadas a la API
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch, debounceMs]);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <View className={`mx-4 mb-4 flex-row items-center rounded-lg border ${getBorderColor()} ${getCardBackgroundColor()} px-4 py-3 mt-4`}>
      <Ionicons name="search" size={20} color="#9ca3af" />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className={`ml-3 flex-1 ${getTextColor()}`}
        returnKeyType="done"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={handleClear} className="ml-2">
          <Ionicons name="close-circle" size={20} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </View>
  );
};
