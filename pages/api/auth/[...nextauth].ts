import { dbUsers } from 'database';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  // Session options
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    strategy: 'jwt',
  },

  //Custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  // Providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email = '', password = '' } = credentials;
        return dbUsers.checkUserEmailAndPassword(email, password);
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],

  // Custom callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      const _token = token;

      if (!account) return _token;

      _token.accessToken = account.accessToken;

      switch (account.type) {
        case 'credentials':
          _token.user = user;
          break;
        case 'oauth':
          _token.user = await dbUsers.oAuthToDatabase(user?.email ?? 'hola', user?.name ?? 'hola');
          break;
      }

      return _token;
    },
    async session({ session, token }) {
      const _session = session;
      _session.accessToken = token.accessToken;
      _session.user = token.user;
      return _session;
    },
  },
});

export default authOptions;
