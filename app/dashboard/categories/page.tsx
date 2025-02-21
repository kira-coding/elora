// app/page.jsx
'use client'
import AddCategoryItem from '@/components/AddCategoryItem';
import CategoryItem, { Category } from '@/components/CategoryItem';

import { authClient } from '@/lib/auth-client';

import axios from 'axios';
import { Loader2 } from 'lucide-react';

import { useEffect, useState } from 'react';

export default function Page() {
  const { data, isPending } = authClient.useSession()
  let [categoryTree, setCategoryTree] = useState<Category[] | null>([]);
  // Fetch your category tree from your API endpoint.
  // The `cache: 'no-store'` option ensures that fresh data is fetched on every request.
  useEffect(() => {
    const fetchCategories = async () => {
      if (isPending == false) {
        const response = await axios.get('/api/categories', {
          headers: {
            Cookie: 'better-auth.session_token=' + data!.session.token,
          }
        });
        setCategoryTree(response.data);
      };
    }
    fetchCategories();
  }, [isPending]);

  return (
    <>
      <div className="flex justify-end"><AddCategoryItem  ></AddCategoryItem></div>
      {isPending && <div className="flex items-center justify-center h-screen"><Loader2 size={32} /></div>}
      {!isPending && (categoryTree && categoryTree.length > 0) &&
        <>
          <ul className="menu menu-x text-2xl  bg-base-200 rounded-lg w-full max-w-5xl">

            {categoryTree.map((category: Category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </ul>
        </>}


    </>
  );
}
