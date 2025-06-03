import { useAuth } from '@/context/auth-context';
import { Redirect } from 'expo-router';

export default function Index() {
  const { user, checking } = useAuth();

  if (checking) return null;

  return <Redirect href={user ? '/(app)' : '/(auth)'} />;
}
