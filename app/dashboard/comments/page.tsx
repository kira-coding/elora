import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Comment } from '@prisma/client';
import axios from 'axios';
import { headers } from 'next/headers';
import React from 'react'

 async function page() {
        let comments= await prisma.comment.findMany()
        let cards= comments.map((value,index)=>{return (
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