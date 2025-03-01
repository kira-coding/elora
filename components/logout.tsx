'use client'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import {LogOutIcon} from 'lucide-react/icons'

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
    <a className="btn btn-ghost" onClick={signout}><LogOutIcon></LogOutIcon></a>
  )
}

export default Logout