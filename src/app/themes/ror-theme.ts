import { definePreset } from '@primeng/themes';
import BaseTheme from './base-theme';

export const RorTheme = definePreset(BaseTheme, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
    colorScheme: {
      light: {
        formField: {
          // Use a light gray background for inputs in light mode to improve visibility (e.g., column filters)
          background: '{surface.200}',
        },
        primary: {
          color: '{zinc.500}',
          hoverColor: '{zinc.600}',
          activeColor: '{zinc.800}',
        },
        highlight: {
          background: '{zinc.200}',
          focusBackground: '{zinc.300}',
          color: '#000000',
          focusColor: '#000000',
        },
      },
      dark: {
        primary: {
          color: '{zinc.700}',
          hoverColor: '{zinc.500}',
          activeColor: '{zinc.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});
export default RorTheme;
