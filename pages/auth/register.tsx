import React from 'react';
import { Anchor, Box, Button, Grid, TextInput, Title } from '@mantine/core';
import NextLink from 'next/link';
import { AuthLayout } from '../../components/Layouts';

const RegisterPage = () => (
  <AuthLayout title="Login">
    <Box w={350} p={20}>
      <Grid gutter="lg">
        <Grid.Col xs={12}>
          <Title order={2}>Register</Title>
        </Grid.Col>
        <Grid.Col xs={12}>
          <TextInput label="Full name" />
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
          <Anchor component={NextLink} href="/auth/login" underline>
            Already have an account?
          </Anchor>
        </Grid.Col>
      </Grid>
    </Box>
  </AuthLayout>
);

export default RegisterPage;
