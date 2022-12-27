import { getUserByEmail } from '@lib/prisma/user';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const data = req.body;
            const email = data?.email;
            if (!email) throw new Error("No email provided");
            const { user, error } = await getUserByEmail(email);
            if (error) throw new Error(error);
            return res.status(201).json({ user });
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
    res.status(425).end(`Method ${req.method} is not allowed for login`);
};

export default handler;