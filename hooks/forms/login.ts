import { TransformedValues, hasLength, isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuth } from 'hooks/context';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();
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

  const onLoginError = (errors: typeof loginForm.errors) => {
    notifications.show({
      id: 'login-form',
      message: 'Be sure to fill out the form',
      color: 'red',
    });
  };

  const onLogin = async ({ email, password }: TransformedValues<typeof loginForm>) => {
    setIsLoading(true);
    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setIsLoading(false);
      return;
    }

    router.replace('/');
  };

  return {
    loginForm,
    onLoginError,
    onLogin,
    isLoading,
  };
};
