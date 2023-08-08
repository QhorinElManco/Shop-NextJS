import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Spotlight } from 'components/Spotlight';
import { AuthProvider, CartProvider } from 'context';
import { getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { configTheme } from 'styles/theme.config';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface Props extends AppProps {
  colorScheme: ColorScheme;
  dehydratedState: DehydratedState;
  session: Session;
}

export function App(props: Props) {
  const { Component, pageProps, dehydratedState, session } = props;
  const [queryClient] = useState(() => new QueryClient());
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <Hydrate state={dehydratedState}>
              <ReactQueryDevtools initialIsOpen={false} />
              <MantineProvider
                theme={{
                  colorScheme,
                  ...configTheme,
                }}
                withGlobalStyles
                withNormalizeCSS
              >
                <AuthProvider>
                  <CartProvider>
                    <Notifications />
                    <Spotlight>
                      <Component {...pageProps} />
                    </Spotlight>
                  </CartProvider>
                </AuthProvider>
              </MantineProvider>
            </Hydrate>
          </ColorSchemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

export default App;
