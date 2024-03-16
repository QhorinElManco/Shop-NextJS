import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    brown: [
      '#EFEBE9',
      '#D7CCC8',
      '#BCAAA4',
      '#A1887F',
      '#8D6E63',
      '#795548',
      '#6D4C41',
      '#5D4037',
      '#4E342E',
      '#3E2723',
    ],
  },
  primaryColor: 'brown',
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'lg',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        variant: 'filled',
      },
    },
  },
});
