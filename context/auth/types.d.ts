export interface UserInfo {
  name: string;
  email: string;
  role: string;
}

export interface ContextProps {
  user?: UserInfo;
  isLoggedIn: boolean;
  logoutUser: () => void;
  registerUser: (values: { name: string; email: string; password: string }) => Promise<void>;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: UserInfo;
}
