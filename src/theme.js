import Constants from 'expo-constants';
import {useWindowDimensions, Platform} from 'react-native';

// Возвращает стиль приложения относительно цветовой схемы устройства
export default function getTheme(scheme) {
  const { width, height } = useWindowDimensions();
  const isDark = (scheme === 'dark');
  const normalize = (size, max) => Math.min(size * (width / 375), max);

  return {
    isDark,
    width,
    height,
    ios: Platform.OS === 'ios',
    margin: normalize(20, 35),
    colors: {
      white: '#ffffff',
      primary: '#ff6b6b',
      success: '#20bf6b',
      warning: '#f39c12',
      error: '#e74c3c',
      text: isDark ? '#f2f2f2' : '#1a1a1a',
      card: isDark ? '#000000' : '#ffffff',
      background: isDark ? '#1a1a1a' : '#f2f2f2',
      border: isDark ? '#f2f2f2dd' : '#1a1a1add',
      button: isDark ? '#1a1a1add' : '#f2f2f2dd',
    },
    font: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    status: Constants.statusBarHeight,
    navbar: Constants.statusBarHeight + 44,
    normalize,
  };
}
