import LoadingScreen from '@/components/LoadingScreen';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

const RootNavigator = () => {
  const { user, checking } = useAuth();

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="settings" />
        <Stack.Screen name="account" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <RootNavigator />
      <Toast />
    </AuthProvider>
  );
};

export default RootLayout;
