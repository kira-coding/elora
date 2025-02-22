import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { data:{userid} } = await request.json()
        const user = await prisma.user.delete({ where: { id: userid } })


        await prisma.session.deleteMany({ where: { userId: user.id } })
        await prisma.account.deleteMany({ where: { userId: user.id } })
        return Response.json({ deleted: true })

    }
    catch (err) {
        return Response.json({ error: true, message: err })
    }
}
