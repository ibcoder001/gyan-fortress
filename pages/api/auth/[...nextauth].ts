// @ts-nocheck

import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialProvider from "next-auth/providers/credentials";
import { authenticateUser, getUserByEmail } from "@lib/prisma/user";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY!,
      clientSecret: process.env.TWITTER_API_SECRET!,
    }),
    CredentialProvider({
      async authorize(credentials, req) {
        if (req.method === "POST") {
          try {
            const email = credentials!.email;
            const { error: noUserError } = await getUserByEmail(email);
            if (!!noUserError) throw new Error(noUserError.message);
            const hashPassword = await bcrypt.hash(
              credentials!.password,
              process.env.SERVER_HASH_SALT!
            );
            console.log(hashPassword);
            // TODO: modify the code here in future for 2FA auth using email code
            const { user } = await authenticateUser(
              email,
              hashPassword,
              Boolean(credentials!.rememberMe)
            );
            if (user) {
              return {
                id: user.id,
                name: user.name,
                username: user.username,
                image: user.imageUrl,
              };
            }
            return null;
          } catch (error: any) {
            console.log(error);
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/[...slug]/page",
  },
};

export default NextAuth(authOptions);
