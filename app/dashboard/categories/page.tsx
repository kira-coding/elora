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
          <ul className="menu menu-x text-2xl ml-auto mr-auto bg-base-200  rounded-lg w-11/12 lg:w-1/2 max-w-full">
            {categoryTree.map((category: Category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </ul>
        </>}
    </>
  );
}
