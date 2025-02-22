export const dynamic = 'force-dynamic';
import Delete from '@/components/delete';

import React from 'react'
import Signupmodal from '@/components/signupmodal';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

async function page() {
  const users = await prisma.user.findMany();
  const data =await auth.api.getSession({headers:await headers()})
  const Rows=  users.map((value:User,index:number)=>{return (
    <tr key={index} className='hover'>
    <th>{index}</th>
    <td>{value.name}</td>
    <td>{value.email}</td>
    <td><Delete userId={value.id.toString()} current={data!.user}></Delete></td>
  </tr>

  )})
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
        <th><Signupmodal></Signupmodal></th>
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