export const dynamic = 'force-dynamic';
import TGdelete from '@/components/TGdelete';
import prisma from '@/lib/prisma';
import { TGAccount } from '@prisma/client';
import React from 'react'

async function page() {
  const users = await prisma.tGAccount.findMany();
  const Rows = users.map((value: TGAccount, index: number) => {
    return (
      <tr key={index} className='hover'>
        <th>{index}</th>
        <td>{value.name}</td>
        <td>{value.username}</td>
        <td><TGdelete accountId={value.id}></TGdelete></td>
      </tr>

    )
  })
  return (

    <div className="overflow-x-auto">

      <table className="table px-44">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {Rows}
          {/* row 2 */}
        </tbody>
      </table>
    </div>
  )
}

export default page