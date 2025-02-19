import { PrismaClient, Level } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

export const levels=Level
const prisma = new PrismaClient().$extends(withAccelerate())

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma