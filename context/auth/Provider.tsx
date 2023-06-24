import { notifications } from '@mantine/notifications';
import { tesloAPI } from 'api';
import { AxiosError, isAxiosError } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { FC, useEffect, useReducer } from 'react';
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
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloAPI.post<ResponseLogin>('/user/login', { email, password });

      if ('token' in data) {
        const { token, user } = data;
        setCookie('token', token);
        dispatch({ type: 'Auth - login', payload: user });
      }

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
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
      return false;
    }
  };

  const registerUser = async (values: {
    name: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const { data } = await tesloAPI.post<ResponseLogin>('/user/register', values);

      if ('token' in data) {
        const { token, user } = data;
        setCookie('token', token);
        dispatch({ type: 'Auth - login', payload: user });
      }

      return true;
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
        return false;
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

  const checkToken = async (): Promise<boolean> => {
    if (getCookie('token') === undefined) return false;

    try {
      const { data } = await tesloAPI.get<ResponseLogin>('/user/validate-token');

      if ('token' in data) {
        const { token, user } = data;
        setCookie('token', token);
        dispatch({ type: 'Auth - login', payload: user });
      }

      return true;
    } catch (error) {
      deleteCookie('token');
      dispatch({ type: 'Auth - logout' });

      // TODO: Redirect to login page

      return false;
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // methods
        loginUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
