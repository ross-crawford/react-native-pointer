import { account, teams } from '@/lib/appwrite';
import { toast } from '@/lib/toast';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ID, Models } from 'react-native-appwrite';

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  checking: boolean;
  teamList: Models.Team<Models.Preferences>[] | null;
  register: (email: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  checking: true,
  teamList: null,
  register: async () => null,
  login: async () => null,
  logout: async () => null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [checking, setChecking] = useState<boolean>(true);
  const [teamList, setTeamList] = useState<
    Models.Team<Models.Preferences>[] | null
  >(null);

  const initialise = async () => {
    try {
      const currentUser = await account.get();
      const currentUserTeams = await teams.list();
      setTeamList(currentUserTeams.teams);
      setUser(currentUser);
    } catch {
      setUser(null);
      setTeamList(null);
    } finally {
      setChecking(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
      toast('Registration successful! You are now logged in.');
      return null;
    } catch (error) {
      toast('Registration failed. Please try again.', 'error');
      if (error instanceof Error) {
        return error.message;
      }
      return 'An unknown error occurred during registration.';
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await initialise();
      toast('Login successful!');
      return null;
    } catch (error) {
      setUser(null);
      toast(
        'Login failed. Please check your credentials and try again.',
        'error'
      );
      if (error instanceof Error) {
        return error.message;
      }
      return 'An unknown error occurred during sign-up.';
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      setTeamList(null);
      toast('Logout successful!');
      return null;
    } catch (error) {
      toast('Logout failed. Please try again.', 'error');
      if (error instanceof Error) {
        return error.message;
      }
      return 'An unknown error occurred during logout.';
    }
  };

  useEffect(() => {
    initialise();
  }, []);

  return (
    <AuthContext.Provider
      value={{ register, login, logout, teamList, user, checking }}
    >
      {children}
    </AuthContext.Provider>
  );
};
