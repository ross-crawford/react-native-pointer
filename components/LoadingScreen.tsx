import { ActivityIndicator, View } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#6750A4" />
    </View>
  );
};

export default LoadingScreen;
