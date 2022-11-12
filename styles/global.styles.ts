import { keyframes, MantineTheme } from '@mantine/core';

export const fadeIn = keyframes({
  'from, 0%, to': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const globalStyles = (theme: MantineTheme) => ({
  '.header-content': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },

  '.container-404': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 100px)',

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      flexDirection: 'column',
    },
  },

  '.navbar-link-with-icon': {
    display: 'flex',
    alignItems: 'center',
    color: theme.fn.primaryColor(),
    padding: 8,
    borderRadius: `0px ${theme.radius.lg}px ${theme.radius.lg}px 0px`,
  },

  '.navbar-link-with-icon-active': {
    backgroundColor: theme.fn.primaryColor(),
    color: theme.white,
  },

  '.fade': {
    WebkitAnimation: `${fadeIn} 1.5s both`,
    animation: `${fadeIn} 1.5s both`,
  },
});
