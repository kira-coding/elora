import prisma from "@/lib/prisma"

export async function DELETE(request: Request, { params }: { params: Promise<{ userid: string }> }) {
    // try {
    let user = await prisma.user.delete({ where: { id: (await params).userid } })


    await prisma.session.deleteMany({ where: { userId: user.id } })
    await prisma.account.deleteMany({ where: { userId: user.id } })
    return Response.json({ deleted: true })

    // }
    // catch (err) {
    //     return Response.json({ error: true, message: err })
    // }
}
