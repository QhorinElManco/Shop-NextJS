import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';

import { theme } from '@/styles/theme.config';
import { AuthProvider, CartProvider } from '@/context';
import { Spotlight } from '@/components/spotlight';

interface Props extends AppProps {
  session: Session;
}
export function App(props: Props) {
  const { Component, pageProps, session } = props;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <SessionProvider session={session}>
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CL || '' }}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <HydrationBoundary state={pageProps.dehydratedState}>
              <MantineProvider theme={theme}>
                <Notifications />
                <AuthProvider>
                  <CartProvider>
                    <Spotlight />
                    <Component {...pageProps} />
                  </CartProvider>
                </AuthProvider>
              </MantineProvider>
            </HydrationBoundary>
          </QueryClientProvider>
        </PayPalScriptProvider>
      </SessionProvider>
    </>
  );
}

export default App;
