import Toast from 'react-native-toast-message';

export function toast(msg: string, type: 'success' | 'error' = 'success') {
  Toast.show({
    type,
    text1: msg,
    position: 'bottom',
  });
}
