// app/page.jsx

import AddCategoryItem from '@/components/AddCategoryItem';
import CategoryItem, { Category } from '@/components/CategoryItem';
import { auth } from '@/lib/auth';

import axios from 'axios';
import { headers } from 'next/headers';


export default async function Page() {
  const session=await auth.api.getSession({headers:await headers()})
  
  // Fetch your category tree from your API endpoint.
  // The `cache: 'no-store'` option ensures that fresh data is fetched on every request.
  const res = await axios.get('http://localhost:3000/api/categories', {
    headers:{
      Cookie:"better-auth.session_token="+session?.session.token
    }
  });
  if (!res) {
    throw new Error('Failed to fetch categories');
  }
  const categoryTree: Category[] = await res.data;

  return (
    <>
      <div className="flex justify-end"><AddCategoryItem  ></AddCategoryItem></div>
      {categoryTree.length > 0 &&
       <>
        <ul className="menu menu-x text-2xl  bg-base-200 rounded-lg w-full max-w-5xl">

          {categoryTree.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </ul>
      </>}
    </>
  );
}
