import React from 'react';
import { Anchor, Box, Button, Grid, TextInput, Title } from '@mantine/core';
import NextLink from 'next/link';
import { AuthLayout } from '../../components/Layouts';

const LoginPage = () => (
  <AuthLayout title="Login">
    <Box w={350} p={20}>
      <Grid gutter="lg">
        <Grid.Col xs={12}>
          <Title order={2}>Login</Title>
        </Grid.Col>
        <Grid.Col xs={12}>
          <TextInput label="Email" />
        </Grid.Col>
        <Grid.Col xs={12}>
          <TextInput label="Password" type="password" />
        </Grid.Col>
        <Grid.Col xs={12}>
          <Button fullWidth>Login</Button>
        </Grid.Col>
        <Grid.Col xs={12} ta="right">
          <Anchor component={NextLink} href="/auth/register" underline>
            You do not have an account yet
          </Anchor>
        </Grid.Col>
      </Grid>
    </Box>
  </AuthLayout>
);

export default LoginPage;
