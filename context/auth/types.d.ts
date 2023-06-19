export interface ContextProps {
  isLoggedIn: boolean;
  user?: User;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (values: { name: string; email: string; password: string }) => Promise<boolean>;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}
