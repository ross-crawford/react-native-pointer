import { useAuth } from '@/context/auth-context';
import { Redirect } from 'expo-router';

const Index = () => {
  const { user } = useAuth();

  return <Redirect href={user ? '/(app)' : '/(auth)'} />;
};

export default Index;
