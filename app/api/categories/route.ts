import prisma from '@/lib/prisma';

import { levels } from "@/lib/prisma"

import { Category } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// Helper function to recursively build the category tree.
function buildCategoryTree(
    categories: Category[],
    parentId: string | null = null
): Category[] {
    return categories
        .filter((category) => category.parentId === parentId)
        .map((category: Category) => ({
            ...category,
            subcategories: buildCategoryTree(categories, category.id),
        }));
}

export async function GET() {
    try {
        // Fetch all categories and include any related TGAccounts.
        const categories = await prisma.category.findMany({
            include: {
                tgAccounts: true,
            },
        });
        // Build the tree structure from the flat list.
        const categoryTree = buildCategoryTree(categories);

        return NextResponse.json(categoryTree);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, id } = await request.json()
        let root: typeof levels.Root | typeof levels.Sub = levels.Sub
        if ((parseInt(id) == 5)) {
            root = levels.Root
        }
        const cat = await prisma.category.create({ data: { name: name, type: root } })
        if (root == levels.Sub) {
            await prisma.category.update({ where: { id: id }, data: { children: { connect: { id: cat.id } } } })
        }
        return NextResponse.json(cat)
    }
    catch (err) {
        return NextResponse.json({ error: true, message: err })
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { name, id } = await request.json()
        await prisma.category.update({ where: { id: id }, data: { name: name } })
        return NextResponse.json({ success: true })
    }
    catch (err) {
        return NextResponse.json({ error: true, message: err })
    }
}

