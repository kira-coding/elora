import prisma from "@/lib/prisma"

export async function POST(request: Request) {
    try {
        const { username, id, display_name,description } = await request.json()
        await prisma.category.update({ where: { id }, data: { tgAccounts: { create: { name: display_name, username,description } } } })
        return Response.json({success:true})
    }
    catch (err) {
        return Response.json({ error: true, message: err })
    }
}
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()
        await prisma.tGAccount.delete({ where: { id } })
        return Response.json({ success: true })
    }
    catch (err) {
        return Response.json({ error: true, message: err })
    }
}
export async function PATCH(request: Request, ) {
    try {
        const { username, id, display_name ,description} = await request.json()
        await prisma.tGAccount.update({ where: { id }, data: { username: username, name: display_name,description } })
        return Response.json({ success: true })
    }
    catch (err) {
        return Response.json({ error: true, message: err })
    }
}
