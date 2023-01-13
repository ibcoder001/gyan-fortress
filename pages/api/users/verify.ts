import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyEmail } from '@lib/prisma/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const request = req?.query;
            const token = request?.token;
            if (!token) {
                return res.status(404).json({
                    success: false,
                    code: 404,
                    message: "No token found!"
                });
            }
            const user = await verifyEmail(token as string);
            console.log(user);
            return res.status(200).redirect(`${process.env.NEXTAUTH_URL!}/auth/login/?success=true`);
        } catch (error: any) {
            return res.status(error?.code || 500).json({
                success: false,
                code: error.code,
                message: error.message
            });
        }
    }
    res.setHeader('Allow', ['GET']);
    return res.status(425).json({
        success: false,
        code: 425,
        message: `Method ${req.method} is not allowed for email verification`
    });
};

export default handler;