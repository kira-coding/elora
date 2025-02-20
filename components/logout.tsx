'use client'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'


import React from 'react'

function Logout() {
    const router = useRouter()
    async function signout() {
        await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/"); // redirect to login page
              },
            },
          })
    }

  return (
    <a className="btn btn-ghost" onClick={signout}>Logout</a>
  )
}

export default Logout