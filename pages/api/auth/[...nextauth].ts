import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        strategy: "jwt"
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
            clientSecret: process.env.TWITTER_API_SECRET!
        }),
        // CredentialProvider({
        //     type: "credentials",
        //     credentials: {},
        //     authorize: async (credentials, req) => {
        //         if (req.method === "POST") {
        //             try {
        //                 const email = req.body?.email as string;
        //                 const { user: existingUser } = await getUserByEmail(email);
        //                 if (existingUser) throw new Error("Email already exists!");
        //                 const hashPassword = await bcrypt.hash(req.body?.password, process.env.SERVER_HASH_SALT!);
        //                 const userData = { username: req.body?.username, email: req.body?.email, password: hashPassword, signForNewsLetter: req.body?.signForNewsLetter } as TSignUpFormSchema;
        //                 const { error } = await createUser(userData);
        //                 if (error) throw new Error(error);
        //                 // Send email to the user's email using nodemailer
        //                 return { status: 201, message: "Email verification code sent to your email. Please verify to login!" };
        //             } catch (error: any) {
        //                 return {
        //                     error: {
        //                         code: error?.code,
        //                         meta: error?.meta,
        //                         message: error?.message,
        //                         clientVersion: error?.clientVersion,
        //                         stack: error?.stack
        //                     }
        //                 };
        //             }
        //         }
        //     },
        // })
    ],
    pages: {
        signIn: '/auth/[...slug]/page',
    },
};

export default NextAuth(authOptions);