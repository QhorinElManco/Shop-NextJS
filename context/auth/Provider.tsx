import { notifications } from '@mantine/notifications';
import { tesloAPI } from 'api';
import { isAxiosError } from 'axios';
import { IUser } from 'interfaces';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useReducer } from 'react';
import { cookieHelper } from 'utils';
import { RequestNotControllerError } from 'utils/errors';
import { AuthContext } from './Context';
import { authReducer } from './Reducer';
import { AuthState } from './types';

type ResponseLogin =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const registerUser = async (values: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      await tesloAPI.post<ResponseLogin>('/user/register', values);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          const { data } = error.response;
          const { message } = data;

          notifications.show({
            id: 'login-form',
            message,
            color: 'red',
            autoClose: false,
          });
        }
      }

      notifications.show({
        id: 'login-form',
        message: 'Something went wrong',
        color: 'red',
        autoClose: false,
      });

      throw new RequestNotControllerError('Not register user');
    }
  };

  const logoutUser = async () => {
    cookieHelper.clearAddressCookies();
    await signOut();
    router.reload(); // Hace un refresh de la página para limpiar el estado
  };

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: 'Auth - login', payload: sessionData?.user as IUser });
    }
  }, [status, sessionData]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // methods
        logoutUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
