import { TransformedValues, hasLength, isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginForm = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: isEmail('Email is not valid'),
      password: hasLength({ min: 8 }, 'Password must have 8 characters'),
    },

    transformValues: (values) => ({
      email: values.email.toLowerCase().trim(),
      password: values.password.trim(),
    }),
  });

  // (errors: typeof loginForm.errors)
  const onLoginError = () => {
    notifications.show({
      id: 'login-form',
      message: 'Be sure to fill out the form',
      color: 'red',
    });
  };

  const onLogin = async ({ email, password }: TransformedValues<typeof loginForm>) => {
    setIsLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      await router.push(router.query?.p?.toString() || '/');
      return;
    }

    if (result?.error) {
      notifications.show({
        id: 'login-form',
        message: 'Login failed. Check your credentials.',
        color: 'red',
      });
    }

    setIsLoading(false);
  };

  return {
    loginForm,
    isLoading,
    // methods
    onLogin,
    onLoginError,
  };
};
