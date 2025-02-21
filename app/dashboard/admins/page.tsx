
import Delete from '@/components/delete';

import React from 'react'
import Signupmodal from '@/components/signupmodal';
import prisma from '@/lib/prisma';

async function page() {
  const users = await prisma.user.findMany({});
  const Rows=  users.map((value,index)=>{return (
    <tr key={index} className='hover'>
    <th>{index}</th>
    <td>{value.name}</td>
    <td>{value.email}</td>
    <td><Delete userId={value.id.toString()}></Delete></td>
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