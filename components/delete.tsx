'use client'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { createFetch } from "@better-fetch/fetch";
import { redirect, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

function Delete({ userId }: { userId: string }) {
  let {data,isPending}=authClient.useSession()
  let router = useRouter()
  return (
    <button onClick={async () => {

      let result = await axios.delete("/api/users/" + userId)
      if (result.data.deleted) {
        
        if(data!.user.id==userId&&!isPending){
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
               router.push("/") // redirect to login page
            },
            onError:(ctx)=>{
              toast.error(ctx.error.message)
            }
          },
        }
      )
      return;
    }

      }
      await authClient.revokeOtherSessions()
    }}><Trash2 size={20} color="#ff0000" strokeWidth={2} /></button>
  )
}

export default Delete