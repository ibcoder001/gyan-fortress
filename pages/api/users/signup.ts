import { createUser, getUserByEmail } from '@lib/prisma/user';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const email = req.body?.email;
            const { user: existingUser } = await getUserByEmail(email);
            if (existingUser) throw new Error("Email already exists!");
            const hashPassword = await bcrypt.hash(req.body?.password, process.env.SERVER_HASH_SALT!);
            const userData = { ...req.body, password: hashPassword };
            const { user, error } = await createUser(userData);
            if (error) throw new Error(error);
            return res.status(201).json({ user });
            if (userData?.signUpVerified) {
                const { user, error } = await createUser(userData);
                if (error) throw new Error(error);
                return res.status(201).json({ user });
            } else {
                // send sign-up-verification code to user's email using nodemailer
                return res.status(200).json({
                    message: "Verification code sent to the provided email!"
                });
            }
        } catch (error: any) {
            return res.status(error?.code || 500).json({
                error: {
                    code: error?.code,
                    meta: error?.meta,
                    message: error?.message,
                    clientVersion: error?.clientVersion,
                    stack: error?.stack
                }
            });
        }
    }
    res.setHeader('Allow', ['POST']);
    res.status(425).end(`Method ${req.method} is not allowed for sign-up`);
};

export default handler;