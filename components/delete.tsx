'use client'
import axios from 'axios'
import {  Trash2 } from 'lucide-react'
import React from 'react'

import {  useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { User } from 'better-auth';

function Delete({ userId ,current}: { userId: string ,current:User|undefined}) {

  const router = useRouter()
  return (
    <button onClick={async () => {

      const result = await axios.delete("/api/users", {
        data:{userid: userId},headers: {
          Cookie: "better-auth.session_token=" + localStorage.getItem("better-auth.session_token")
        },
      })
      if (result.data.deleted) {

        if (current!.id== userId ) {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/")
              },

            },
          }
          )
          return;
        }
        router.push("/dashboard/admins")

      }
      await authClient.revokeOtherSessions()
    }}><Trash2 size={20} color="#ff0000" strokeWidth={2} /></button>
  )
}

export default Delete