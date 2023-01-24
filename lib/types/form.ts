import { z } from "zod";

export const signUpFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(6, "Username must be at least 6 characters long"),
  email: z.string().trim().email("Please enter valid email!"),
  password: z.string().trim().min(8).max(16),
  confirmPassword: z.string().trim().min(8).max(16),
  signForNewsLetter: z.boolean().default(true),
});

export const signUpFormDBSchema = z.object({
  username: z
    .string()
    .trim()
    .min(6, "Username must be at least 6 characters long"),
  email: z.string().trim().email("Please enter valid email!"),
  password: z.string().trim().min(8).max(16),
  signForNewsLetter: z.boolean().default(true),
  email_verification_token: z.string(),
  sign_for_news_letter: z.boolean().default(true),
});

export const loginFormSchema = z.object({
  email: z.string().trim().email("Please enter valid email!"),
  password: z.string().trim().min(8).max(16),
});

export const loginVerificationFormSchema = z.object({
  verificationCode: z
    .string()
    .trim()
    .min(6, "Code is 6 letters long")
    .max(6, "Code is 6 letters long"),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().trim().email("Please enter valid email!"),
});

export const contactMeFormSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email("Please enter valid email"),
  subject: z.string().trim(),
  message: z.string().trim(),
});

export type TSignUpFormSchema = z.infer<typeof signUpFormSchema>;
export type TSignUpFormDBSchema = z.infer<typeof signUpFormDBSchema>;
export type TLoginFormSchema = z.infer<typeof loginFormSchema>;
export type TLoginVerificationFormSchema = z.infer<
  typeof loginVerificationFormSchema
>;
export type TForgotPasswordFormSchema = z.infer<
  typeof forgotPasswordFormSchema
>;
export type TContactMeFormSchema = z.infer<typeof contactMeFormSchema>;
