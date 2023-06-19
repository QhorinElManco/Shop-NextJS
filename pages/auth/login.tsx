import { Anchor, Box, Button, Grid, TextInput, Title } from '@mantine/core';
import { useLogin } from 'hooks/forms';
import NextLink from 'next/link';
import { AuthLayout } from '../../components/Layouts';

const LoginPage = () => {
  const { loginForm, onLogin, onLoginError, isLoading } = useLogin();
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
              {/* TODO: Agregar link para register */}
              <Anchor component={NextLink} href="/auth/register" size="sm" underline>
                You do not have an account yet
              </Anchor>
            </Grid.Col>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
