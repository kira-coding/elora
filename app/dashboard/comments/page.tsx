export const dynamic = 'force-dynamic';

import DeleteComment from '@/components/deleteComment';
import prisma from '@/lib/prisma';

import React from 'react'

 async function page() {
        const comments= await prisma.comment.findMany()
        const cards= comments.map((value: {id:string, username:string,content:string},index:number)=>{return (
            <div key={index} className="card bordered">
            <div className="m-4">
                <div className="card-body">
                    <h2 className="card-title">{value.username}</h2>
                    <p>{value.content}</p>
                    <DeleteComment commentId={value.id} ></DeleteComment>
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