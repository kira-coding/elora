import prisma, { levels } from "@/lib/prisma"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { name } = await request.json()
        let root: typeof levels.Root | typeof levels.Sub = levels.Sub
        if ((parseInt((await params).id) == 5)) {
            root = levels.Root
        }
        const cat = await prisma.category.create({data:{ name: name, type:root}})
        if (root ==levels.Sub) {
            await prisma.category.update({where:{id:(await params).id},data:{children:{connect:{id:cat.id}}}} )
        }
        return Response.json(cat)
    }
    catch (err) {
        return Response.json({ error: true, message: err })
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        let { name } = await request.json()
        let cat = await prisma.category.update({where:{id:(await params).id}, data:{ name: name}})
        return Response.json({ success: true })
    }
    catch (err) {
        return Response.json({ error: true, message: err })
    }
}
