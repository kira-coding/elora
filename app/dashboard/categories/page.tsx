import AddCategoryItem from '@/components/AddCategoryItem';
import CategoryItem, { Category } from '@/components/CategoryItem';

import axios from 'axios';

import { headers } from 'next/headers';


export default async function Page() {
  const header = await headers()
  const res = await axios.get(process.env!.BETTER_AUTH_URL + "/api/categories", { headers: { Cookie: header.get("cookie") } })
  const categoryTree: Category[] = res.data || [];

  return (
    <>
      <div className="flex justify-end"><AddCategoryItem  ></AddCategoryItem></div>
      {
        <>
          <ul className="menu menu-x text-sm md:text-2xl  bg-base-200 rounded-lg w-full max-w-sm md:max-w-md">
            {categoryTree.map((category: Category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </ul>
        </>}
    </>
  );
}
