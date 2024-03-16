import { Anchor, Button, Stack, TextInput, Title } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useRegister } from '@/hooks/forms';
import { UnauthenticatedLayout } from '@/components/layouts';
import { authOptions } from '../api/auth/[...nextauth]';

const RegisterPage = () => {
  const { registerForm, onRegister, onRegisterError, isLoading } = useRegister();
  const router = useRouter();
  return (
    <UnauthenticatedLayout title="Login">
      <form onSubmit={registerForm.onSubmit(onRegister, onRegisterError)}>
        <Stack w={350} p={20} gap="lg">
          <Title order={2}>Register</Title>

          <TextInput
            label="Full name"
            autoComplete="full-name"
            {...registerForm.getInputProps('fullname')}
          />

          <TextInput
            label="Email"
            type="email"
            autoComplete="username"
            {...registerForm.getInputProps('email')}
          />

          <TextInput
            label="Password"
            type="password"
            autoComplete="new-password"
            {...registerForm.getInputProps('password')}
          />

          <Button fullWidth loading={isLoading} type="submit">
            Register
          </Button>

          <Anchor
            component={NextLink}
            href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
            size="sm"
            underline="always"
            ta="right"
          >
            Already have an account?
          </Anchor>
        </Stack>
      </form>
    </UnauthenticatedLayout>
  );
};

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

export default RegisterPage;
