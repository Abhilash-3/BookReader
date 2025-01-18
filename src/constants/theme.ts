import { fonts, fontSizes } from './typography';
import { lightColors, darkColors } from './colors';

export const lightTheme = {
  colors: lightColors,
  fonts,
  fontSizes,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12
  }
};

export const darkTheme = {
  ...lightTheme,
  colors: darkColors
};

export type Theme = typeof lightTheme;
