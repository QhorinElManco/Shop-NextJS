import { TransformedValues, hasLength, isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuth } from 'hooks/context';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useRegister = () => {
  const router = useRouter();
  const { registerUser } = useAuth();
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
      fullname: (fullname) => {
        if (fullname.length === 0) {
          return 'Fullname is required';
        }
        if (fullname.length < 2) {
          return 'Fullname must have at least 2 characters';
        }
        return null;
      },
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
    const success = await registerUser(values);

    if (!success) {
      setIsLoading(false);
      return;
    }

    router.replace('/');
  };

  return {
    registerForm,
    onRegisterError,
    onRegister,
    isLoading,
  };
};
