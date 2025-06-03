import { AuthProvider } from '@/context/auth-context';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="settings" />
      </Stack>
      <Toast />
    </AuthProvider>
  );
}
