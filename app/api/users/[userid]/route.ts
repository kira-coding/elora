import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function DELETE(request:NextRequest,{ params }: { params: Promise<{ userid: string }> }) {
    try {
    const user = await prisma.user.delete({ where: { id: (await params).userid } })


    await prisma.session.deleteMany({ where: { userId: user.id } })
    await prisma.account.deleteMany({ where: { userId: user.id } })
    return Response.json({ deleted: true })

    }
    catch (err) {
        return Response.json({ error: true, message: err })
    }
}
