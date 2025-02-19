import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


import { Category } from '@prisma/client';

// Helper function to recursively build the category tree.
function buildCategoryTree(
    categories: Category[],
    parentId: string | null = null
): {
    [x: string]: any;
    id: string;
    name: string;
    parentId: string | null;
    subcategories: any;
}[] {
    return categories
        .filter((category) => category.parentId === parentId)
        .map((category: any) => ({
            ...category,
            subcategories: buildCategoryTree(categories, category.id),
        }));
}

export async function GET(request: Request) {
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
