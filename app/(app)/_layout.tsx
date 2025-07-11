import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';

const AppLayout = () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <Button onPress={() => router.push('/account')}>
            <Ionicons name="person-outline" size={24} color="black" />
          </Button>
        ),
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#6750A4',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <Ionicons name="home-sharp" size={24} color={color} />
            ) : (
              <Ionicons name="home-outline" size={24} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <Ionicons name="people-sharp" size={24} color={color} />
            ) : (
              <Ionicons name="people-outline" size={24} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <Ionicons name="ticket-sharp" size={24} color={color} />
            ) : (
              <Ionicons name="ticket-outline" size={24} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: 'Summary',
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <Ionicons name="stats-chart-sharp" size={24} color={color} />
            ) : (
              <Ionicons name="stats-chart-outline" size={24} color={color} />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
