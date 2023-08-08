import { TransformedValues, hasLength, isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from 'hooks/context';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export const useRegister = () => {
  const router = useRouter();
  const { registerUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const registerForm = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      fullname: '',
      email: '',
      password: '',
    },

    validate: {
      fullname: hasLength({ min: 2 }, 'Fullname must have at least 2 characters'),
      email: isEmail('Email is not valid'),
      password: hasLength({ min: 8 }, 'Password must have 8 characters'),
    },

    transformValues: (values) => ({
      name: values.fullname.trim(),
      email: values.email.toLowerCase().trim(),
      password: values.password.trim(),
    }),
  });

  const onRegisterError = () => {
    notifications.show({
      id: 'register-form',
      message: 'Be sure to fill out the form',
      color: 'red',
    });
  };

  const onRegister = async (values: TransformedValues<typeof registerForm>) => {
    setIsLoading(true);

    try {
      await registerUser(values);
      const result = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      if (result?.ok) {
        await router.push(router.query?.p?.toString() || '/');
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    registerForm,
    onRegisterError,
    onRegister,
    isLoading,
  };
};
