
import prisma from '@/lib/prisma';

import React from 'react'

 async function page() {
        const comments= await prisma.comment.findMany()
        const cards= comments.map((value,index)=>{return (
            <div key={index} className="card bordered">
            <div className="m-4">
                <div className="card-body">
                    <h2 className="card-title">{value.username}</h2>
                    <p>{value.content}</p>
                </div>
            </div>
        </div>
        )}
        )
  return (
    <div>{cards}</div>
  )
}

export default page