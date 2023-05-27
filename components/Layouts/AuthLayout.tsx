import { Box } from '@mantine/core';
import Head from 'next/head';
import React, { FC, ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <main>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 200px)',
        }}
      >
        {children}
      </Box>
    </main>
  </>
);
