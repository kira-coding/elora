import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create categories
    const category1 = await prisma.category.create({
        data: {
            name: 'Category 1',
            children: {
                create: [
                    {
                        name: 'Subcategory 1-1',
                    },
                    {
                        name: 'Subcategory 1-2',
                    },
                ],
            },
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: 'Category 2',
            children: {
                create: [
                    {
                        name: 'Subcategory 2-1',
                    },
                    {
                        name: 'Subcategory 2-2',
                    },
                ],
            },
        },
    });

    // Create TGAccounts
    await prisma.tGAccount.createMany({
        data: [
            {
                name: 'Account 1',
                username: 'account1',
                categoryId: category1.id,
            },
            {
                name: 'Account 2',
                username: 'account2',
                categoryId: category2.id,
            },
        ],
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });