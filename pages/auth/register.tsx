import { Anchor, Box, Button, Grid, TextInput, Title } from '@mantine/core';
import { useRegister } from 'hooks/forms';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AuthLayout } from '../../components/layouts';
import { authOptions } from '../api/auth/[...nextauth]';

const RegisterPage = () => {
  const { registerForm, onRegister, onRegisterError, isLoading } = useRegister();
  const router = useRouter();
  return (
    <AuthLayout title="Login">
      <Box w={350} p={20}>
        <form onSubmit={registerForm.onSubmit(onRegister, onRegisterError)}>
          <Grid gutter="lg">
            <Grid.Col xs={12}>
              <Title order={2}>Register</Title>
            </Grid.Col>
            <Grid.Col xs={12}>
              <TextInput
                label="Full name"
                autoComplete="full-name"
                {...registerForm.getInputProps('fullname')}
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <TextInput
                label="Email"
                type="email"
                autoComplete="username"
                {...registerForm.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <TextInput
                label="Password"
                type="password"
                autoComplete="new-password"
                {...registerForm.getInputProps('password')}
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <Button fullWidth loading={isLoading} type="submit">
                Register
              </Button>
            </Grid.Col>
            <Grid.Col xs={12} ta="right">
              <Anchor
                component={NextLink}
                href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
                size="sm"
                underline
              >
                Already have an account?
              </Anchor>
            </Grid.Col>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
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
