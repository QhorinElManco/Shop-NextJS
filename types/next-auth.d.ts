import 'next-auth';

import 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      _id: string;
      name: string;
      email: string;
      role: string;
      image?: string | null;
    };
    accessToken: string;
  }

  interface Account {
    accessToken: string;
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}
