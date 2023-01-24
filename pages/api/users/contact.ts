import { submitContactForm } from "@lib/prisma/user";
import { emailContactFormMessage, sendEmail } from "@lib/utils/sendgrid";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // console.log(req.body);
      const name = req.body?.name as string;
      const email = req.body?.email as string;
      const subject = req.body?.subject as string;
      const message = req.body?.message as string;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          code: 500,
          message: "Bad request",
        });
      }
      const { contactForm, error } = await submitContactForm({
        name,
        email,
        subject,
        message,
      });
      if (error || !contactForm) {
        return res.status(error?.code || 404).json({
          success: false,
          code: error?.code || 404,
          message: error?.message || "Submission failed! Please try again.",
        });
      }
      // send email response to the user
      const sendingMessage = emailContactFormMessage(
        contactForm.name,
        contactForm.email,
        contactForm.subject,
        contactForm.message
      );
      const statusCode = await sendEmail(sendingMessage);

      return res.status(201).json({
        status: 201,
        message:
          "Thank you for writing to me. I'll get back to you in few days.",
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
  return res.status(425).json({
    success: false,
    code: 425,
    message: `Method ${req.method} is not allowed for contact`,
  });
};

export default handler;
