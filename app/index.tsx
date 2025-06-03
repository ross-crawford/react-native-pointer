import { useAuth } from '@/context/auth-context';
import { Redirect } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';

const Index = () => {
  const { user, checking } = useAuth();

  if (checking) return <ActivityIndicator animating={true} size="large" />;

  return <Redirect href={user ? '/(app)' : '/(auth)'} />;
};

export default Index;
