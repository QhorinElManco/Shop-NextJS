import { AuthState } from './types';

type AuthActionType =
  | {
      type: 'Auth - login';
      payload: {
        name: string;
        email: string;
        role: string;
      };
    }
  | {
      type: 'Auth - logout';
    };

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case 'Auth - login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case 'Auth - logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
};
