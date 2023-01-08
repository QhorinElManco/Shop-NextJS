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

  '.empty-cart': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

  '.mantine-Carousel-root': {
    '&:hover': {
      '& .mantine-Carousel-control': {
        opacity: 1,
      },
    },
  },

  '.mantine-Carousel-control': {
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  '.grid-content-center': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  '.grid-content-left': {
    display: 'flex',
    justifyContent: 'end',
  },
  '.grid-content-space-between': {
    display: 'flex',
    justifyContent: 'end',
  },
});
