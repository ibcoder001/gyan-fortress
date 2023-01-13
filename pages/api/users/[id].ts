// import { getUserById } from '@lib/prisma/user';
// import { NextApiRequest, NextApiResponse } from 'next';
//
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === "GET") {
//         try {
//             const userId = req.query.id;
//             if (!userId || typeof userId !== "string") throw new Error("Bad Request");
//             const { user, error } = await getUserById(userId);
//             if (error) throw new Error(error);
//             return res.status(200).json({ user });
//         } catch (error: any) {
//             return res.status(500).json({
//                 error: {
//                     code: error?.code,
//                     meta: error?.meta,
//                     message: error?.message,
//                     stack: error?.stack,
//                     clientVersion: error?.clientVersion
//                 }
//             });
//         }
//     }
// };
//
// export default handler;
export {}
