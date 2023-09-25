import { BACKEND_URL } from '@/types/backendUrl';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // .Providers (services to allow users to sign in in our application)

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as any;

        const res = await fetch(`${BACKEND_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },

          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await res.json();

        if (user) {
          return user;
        } else return user?.error;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: '/',
  },

  session: {
    strategy: 'jwt',
    maxAge: 1 * 1 * 60 * 60,
  },

  debug: true,
};
