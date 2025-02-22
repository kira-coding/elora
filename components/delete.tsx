'use client'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import React from 'react'

import { redirect } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

function Delete({ userId }: { userId: string }) {
  const { data, isPending } = authClient.useSession()
  return (
    <button onClick={async () => {

      const result = await axios.delete("/api/users", {
        data:{userid: userId}, headers: {
          Cookie: "better-auth.session_token=" + data!.session.token
        }
      })
      if (result.data.deleted) {

        if (data!.user.id == userId && !isPending) {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                redirect("/") // redirect to login page
              },

            },
          }
          )
          return;
        }
        // router.push("/dashboard/admins")
        redirect("/dashboard/admins")
      }
      await authClient.revokeOtherSessions()
    }}><Trash2 size={20} color="#ff0000" strokeWidth={2} /></button>
  )
}

export default Delete