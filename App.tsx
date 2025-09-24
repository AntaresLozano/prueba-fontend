import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { UsersListScreen } from './src/ui/screens/UsersListScreen';
import { UserDetailScreen } from './src/ui/screens/UserDetailScreen';
import { ThemeProvider } from './src/ui/providers';
import './global.css';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="UsersList"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="UsersList" component={UsersListScreen} />
          <Stack.Screen name="UserDetail" component={UserDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
