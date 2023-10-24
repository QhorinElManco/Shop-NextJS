import { Anchor, Box, Button, Divider, Grid, TextInput, Title } from '@mantine/core';
import { AuthLayout } from 'components/layouts';
import { useLogin } from 'hooks/forms';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';

type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

const LoginPage = () => {
  const router = useRouter();
  const { loginForm, onLoginError, isLoading, onLogin } = useLogin();
  const [providers, setProviders] = useState<Providers>(null);

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  return (
    <AuthLayout title="Login">
      <form onSubmit={loginForm.onSubmit(onLogin, onLoginError)}>
        <Box w={350} p={20}>
          <Grid>
            <Grid.Col xs={12}>
              <Title order={2}>Login</Title>
            </Grid.Col>
            <Grid.Col xs={12}>
              <TextInput
                label="Email"
                type="email"
                autoComplete="username"
                {...loginForm.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <TextInput
                label="Password"
                type="password"
                autoComplete="current-password"
                {...loginForm.getInputProps('password')}
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <Button type="submit" fullWidth loading={isLoading}>
                Login
              </Button>
            </Grid.Col>
            <Grid.Col xs={12} ta="right">
              <Anchor
                component={NextLink}
                href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                size="sm"
                underline
              >
                You do not have an account yet
              </Anchor>
            </Grid.Col>
            <Grid.Col xs={12}>
              <Divider orientation="horizontal" />
              {providers &&
                Object.values(providers)
                  .filter((provider) => provider.type !== 'credentials')
                  .map((provider) => (
                    <Button
                      mb="xs"
                      fullWidth
                      key={provider.name}
                      onClick={() => signIn(provider.id).then()}
                    >
                      {`Sign in with ${provider.name}`}
                    </Button>
                  ))}
            </Grid.Col>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);
  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p as string,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
