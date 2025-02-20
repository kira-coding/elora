import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


// Helper function to recursively gather all descendant category IDs (including the parent)
async function getAllCategoryIdsToDelete(categoryId: string) {
  const ids = [categoryId];

  // Recursive helper that adds the IDs of all child categories
  async function getDescendants(id:string) {
    const children = await prisma.category.findMany({
      where: { parentId: id },
      select: { id: true },
    });
    for (const child of children) {
      ids.push(child.id);
      await getDescendants(child.id);
    }
  }

  await getDescendants(categoryId);
  return ids;
}

export async function POST(request:NextRequest) {
  const { id } = await request.json();

  try {
    // Retrieve all category IDs to be deleted (the parent and its entire subtree)
    const categoryIds = await getAllCategoryIdsToDelete(id);
    // Delete associated TGAccounts and then the categories in a transaction
    await prisma.$transaction([
      prisma.tGAccount.deleteMany({
        where: { categoryId: { in: categoryIds } },
      }),
      prisma.category.deleteMany({
        where: { id: { in: categoryIds } },
      }),
    ]);

    return NextResponse.json({
      message: 'Category and all its descendants deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category tree:', error);
    return NextResponse.json(
      { error: 'Deletion failed' },
      { status: 500 }
    );
  }
}
