import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return new NextResponse("Comment ID is required", { status: 400 });
        }

        const comment = await prisma.comment.findUnique({
            where: {
                id: id,
            },
        });

        if (!comment) {
            return new NextResponse("Comment not found", { status: 404 });
        }

        await prisma.comment.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: "Comment deleted" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}