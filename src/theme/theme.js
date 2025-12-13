import {Platform} from 'react-native';
import {scale} from '../utils/scaling';

export const Colors = {
  white: '#FFFFFF',
  black: '#000000',

  primary: '#01C5BA',
  secondary: '#016DB0',
  accent: '#2A7DFF',
  pinkColor: '#FF72D2',
  purpleColor: '#C379F6',
  yellowColor: '#FFD166',

  ethereum: '#627EEA',

  deepBackground: '#0C0A3D',
  background: '#080134',
  grayBackground: '#F3F4F6',
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(255,255,255,0.03)',

  border: '#393556',
  borderTertiary: '#E5E7EB',
  borderLight: 'rgba(1, 197, 186, 0.3)',
  borderMuted: '#E6EDFF',
  borderLightTransparent: 'rgba(255,255,255,0.1)',

  success: '#10b981',
  successText: '#2E7D32',
  greenLight: '#E8F8F0',

  error: '#FF0000',
  redColor: '#EF4444',

  title: '#212121',
  inputText: '#A8A8A9',
  textPrimary: '#333333',
  textSecondary: '#4a5568',
  textMuted: '#9ca3af',
  textLight: '#666',
  textGray: '#CECCD6',
  textHighlight: '#8A91C5',
  buttonTextColor: '#080134',

  disabledText: '#A0A0A0',
  disabledBorder: '#d0d0d0',
  disabledBackground: '#e0e0e0',

  bottomSheetHandle: '#D1D5DB',

  badgePurple: '#2D1446',
  badgePink: '#561857',
};

export const FontSizes = {
  xsmall: scale(10),
  small: scale(12),
  medium: scale(14),
  regular: scale(16),
  semiLarge: scale(18),
  large: scale(20),
  xlarge: scale(22),
  xxlarge: scale(24),
  huge: scale(26),
};

export const FontWeights = {
  thin: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const Shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#4c63d2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  extraHeavy: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  dropdown: {
    ...Platform.select({
      android: {elevation: 5},
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
    }),
  },
  card: {
    shadowColor: '#b2b2b2ff',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
};

export const lightTheme = {
  mode: 'light',
  background: '#FFFFFF',
  text: '#000000',
  primary: Colors.primary,
  secondary: '#4392F9',
  card: '#F5F5F5',
  border: '#E0E0E0',
  icon: '#333333',
  shadow: 'rgba(0, 0, 0, 0.1)',
  loadingBackground: 'rgba(255,255,255,0.9)',
};

export const darkTheme = {
  mode: 'dark',
  background: '#121212',
  text: '#FFFFFF',
  primary: Colors.primary,
  secondary: '#4392F9',
  card: '#1E1E1E',
  border: '#333333',
  icon: '#FFFFFF',
  shadow: 'rgba(255, 255, 255, 0.1)',
  loadingBackground: 'rgba(0,0,0,0.8)',
};
