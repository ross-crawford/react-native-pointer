import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>('');
  const [passwordError, setPasswordError] = useState<string | null>('');

  const theme = useTheme();
  const { register, login } = useAuth();
  const router = useRouter();

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError(null);
    }
    return isValid;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      validateEmail();
    }
  };

  const validatePassword = () => {
    const isValid = password.length >= 6;
    if (!isValid) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError(null);
    }
    return isValid;
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      validatePassword();
    }
  };

  const handleAuthentication = async () => {
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    if (!validEmail || !validPassword) {
      return;
    }

    if (isSignUp) {
      await register(email, password);
    } else {
      await login(email, password);
    }
    router.replace('/(app)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? 'Create Account' : 'Welcome back!'}
        </Text>

        <View style={styles.field}>
          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            mode="outlined"
            onChangeText={handleEmailChange}
            value={email}
            error={!!emailError}
            onBlur={validateEmail}
          />
          <HelperText type="error" visible={!!emailError}>
            {emailError}
          </HelperText>
        </View>

        <View style={styles.field}>
          <TextInput
            label="Password"
            keyboardType="default"
            secureTextEntry
            autoCapitalize="none"
            mode="outlined"
            onChangeText={handlePasswordChange}
            value={password}
            error={!!passwordError}
            onBlur={validatePassword}
          />
          <HelperText type="error" visible={!!passwordError}>
            {passwordError}
          </HelperText>
        </View>

        <Button mode="contained" onPress={handleAuthentication}>
          {isSignUp ? 'Sign up' : 'Sign in'}
        </Button>
        <Button mode="text" onPress={toggleAuthMode}>
          {isSignUp
            ? 'Already have an account? Sign in'
            : "Don't have an account? Sign up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    gap: 16,
  },
  field: {
    gap: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default AuthScreen;
