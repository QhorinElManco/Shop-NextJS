import { Anchor, Button, Divider, Stack, TextInput, Title } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useLogin } from '@/hooks/forms';
import { UnauthenticatedLayout } from '@/components/layouts';
import { authOptions } from '../api/auth/[...nextauth]';

type Providers = Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null;

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
    <UnauthenticatedLayout title="Login">
      <form onSubmit={loginForm.onSubmit(onLogin, onLoginError)}>
        <Stack w={350} p={20}>
          <Title order={2}>Login</Title>

          <TextInput
            label="Email"
            type="email"
            autoComplete="username"
            {...loginForm.getInputProps('email')}
          />

          <TextInput
            label="Password"
            type="password"
            autoComplete="current-password"
            {...loginForm.getInputProps('password')}
          />

          <Button type="submit" fullWidth loading={isLoading}>
            Login
          </Button>

          <Anchor
            component={NextLink}
            href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
            size="sm"
            underline="always"
            ta="right"
          >
            You do not have an account yet
          </Anchor>

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
        </Stack>
      </form>
    </UnauthenticatedLayout>
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
