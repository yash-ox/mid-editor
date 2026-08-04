import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./modules/auth/actions";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account) return false;

      const existingUser = await db.user.findUnique({
        where: { email: user.email! },
      });

      if (!existingUser) {
        const newUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            image: user.image,

            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            },
          },
        });
      } else {
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!existingAccount) {
          await db.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          });
        }
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.sub && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  adapter: PrismaAdapter(db),
  ...authConfig,
});
