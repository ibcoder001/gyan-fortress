/**
 * Singleton Pattern to not spin up multiple instances of the prisma client on our app
 */

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export function getPrismaClient() {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    return prisma;
}
