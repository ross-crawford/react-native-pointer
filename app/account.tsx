import { useAuth } from '@/context/auth-context';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const AccountScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <Text>This is the account page</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Name: {user?.name}</Text>
      <Text>Labels: {user?.labels.join(', ')}</Text>
      <Text>Preferences: {`${JSON.stringify(user?.prefs)}`}</Text>
      <Text>Status: {`${user?.emailVerification}`}</Text>
      <Text>Joined: {user?.$createdAt}</Text>
      <Text>Last login: {user?.accessedAt}</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};

export default AccountScreen;
