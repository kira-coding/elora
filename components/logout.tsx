'use client'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'


import React from 'react'

function logout() {
    async function signout() {
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