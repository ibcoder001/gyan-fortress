import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "@lib/prisma/user";
import { TSignUpFormDBSchema } from "@lib/types/form";
import { emailVerificationMessage, sendEmail } from "@lib/utils/sendgrid";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const username = req.body?.username as string;
      const email = req.body?.email as string;
      const password = req.body?.password as string;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          code: 500,
          message: "Bad request",
        });
      }

      const { user: existingUsername } = await getUserByUsername(username);

      if (existingUsername) {
        return res.status(422).json({
          success: false,
          code: 422,
          message: "Username already exists!",
        });
      }

      const { user: existingEmail } = await getUserByEmail(email);

      if (existingEmail) {
        return res.status(422).json({
          success: false,
          code: 422,
          message: "User already exists!",
        });
      }

      const hashPassword = await bcrypt.hash(
        password,
        process.env.SERVER_HASH_SALT!
      );
      const emailToken = await bcrypt.hash(
        req.body?.username,
        process.env.SERVER_HASH_SALT!
      );
      const userData = {
        username: req.body?.username,
        email: req.body?.email,
        password: hashPassword,
        email_verification_token: emailToken,
        sign_for_news_letter: req.body?.signForNewsLetter,
      } as TSignUpFormDBSchema;

      const { user, error } = await createUser(userData);

      if (error) {
        return res.status(error?.code || 404).json({
          success: false,
          code: error?.code || 404,
          message: error?.message || "Sign up failed! Please try again.",
        });
      }

      // Send email to the user's email using nodemailer
      const sendingMessage = emailVerificationMessage(
        user?.email!,
        user?.username!,
        user?.email_verification_token!
      );
      console.log(sendingMessage);
      const statusCode = await sendEmail(sendingMessage);
      console.log(statusCode);
      if (statusCode === 202) {
        return res.status(201).json({
          status: 201,
          message:
            "Email verification code sent to your email. Please verify to login!",
        });
      }
      return res.status(201).json({
        status: 201,
        message:
          "Email verification code sent to your email. Please verify to login!",
      });
    } catch (error: any) {
      return res.status(error?.code || 500).json({
        success: false,
        code: error.code,
        message: error.message,
      });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({
    success: false,
    code: 405,
    message: `Method ${req.method} is not allowed for sign-up`,
  });
};

export default handler;
