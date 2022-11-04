import React from 'react';
import { Global } from '@mantine/core';

export const MyGlobalStyles = () => (
  <Global
    styles={(theme) => ({
      '.header_app': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
      },

      '.container_404': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 100px)',

        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
          flexDirection: 'column',
        },
      },

      '.navbar_link_with_icon': {
        display: 'flex',
        alignItems: 'center',
        color: theme.fn.primaryColor(),
        padding: 8, //theme.spacing.sm,
        borderRadius: `0px ${theme.radius.lg}px ${theme.radius.lg}px 0px`,
      },

      '.navbar_link_with_icon_active': {
        backgroundColor: theme.fn.primaryColor(), //theme.colors[theme.primaryColor][6],
        color: theme.white,
      },
    })}
  />
);
