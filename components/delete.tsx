'use client'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import React  from 'react'

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

function Delete({ userId }: { userId: string }) {
  const {data,isPending}=authClient.useSession()
  const router = useRouter()
  return (
    <button onClick={async () => {

      const result = await axios.delete("/api/users/" + userId)
      if (result.data.deleted) {
        
        if(data!.user.id==userId&&!isPending){
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
               router.push("/") // redirect to login page
            },

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