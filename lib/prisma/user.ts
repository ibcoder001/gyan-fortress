import { getPrismaClient } from ".";
import { z } from "zod";

const prisma = getPrismaClient();

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return { users };
  } catch (error: any) {
    return { error };
  }
}

const userSchemaInterface = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  signForNewsLetter: z.boolean().default(false),
  imageUrl: z.string().optional(),
});

export type TUser = z.infer<typeof userSchemaInterface>;

export async function createUser(user: TUser) {
  try {
    const newUser = await prisma.user.create({
      data: user,
    });
    return { user: newUser };
  } catch (error: any) {
    return { error };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("No user found!");
    return { user };
  } catch (error: any) {
    return { error };
  }
}

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    return { user };
  } catch (error: any) {
    return { error };
  }
}

export async function verifyEmail(token: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email_verification_token: token },
    });
    const updateUser = await prisma.user.update({
      where: {
        email: user?.email,
      },
      data: {
        email_verified: true,
      },
    });
    return { updateUser };
  } catch (error: any) {
    return { error };
  }
}

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export type TContactMeFormSchema = z.infer<typeof contactFormSchema>;

export const submitContactForm = async (message: TContactMeFormSchema) => {
  try {
    const contactForm = await prisma.contact.create({
      data: message,
    });
    return { contactForm };
  } catch (error: any) {
    return { error };
  }
};
