import { getPrismaClient } from '.';
import { z } from 'zod';

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
    imageUrl: z.string().optional()
});

export type TUser = z.infer<typeof userSchemaInterface>;

export async function createUser(user: TUser) {
    try {
        const newUser = await prisma.user.create({
            data: user
        });
        return { user: newUser };
    } catch (error: any) {
        return { error };
    }
}

export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        return { user };
    } catch (error: any) {
        return { error };
    }
}