export interface UserInfo {
  name: string;
  email: string;
  role: string;
}

export interface ContextProps {
  isLoggedIn: boolean;
  user?: UserInfo;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (values: { name: string; email: string; password: string }) => Promise<boolean>;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: UserInfo;
}
