'use client'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

import router from 'next/router'
import React from 'react'

function logout() {
    async function signout(e:any) {
        e.preventDefault()
        await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                redirect("/"); // redirect to login page
              },
            },
          })
    }

  return (
    <a className="btn btn-ghost" onClick={signout}>Logout</a>
  )
}

export default logout