'use client'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import React from 'react'

import { redirect } from 'next/navigation';

import { toast } from 'sonner';

function Delete({ accountId }: { accountId: string }) {


    return (
        <button onClick={async () => {

            const result = await axios.delete("/api/tg_accounts/", { data: { id: accountId }, headers: { Cookie: "better-auth.session_token=" + localStorage.getItem("better-auth.session_token") } })
            if (result.status == 200) {
                toast.success("Account deleted")
            }
            else {
                toast.error("Failed to delete account")
            }
            redirect("/dashboard/volunteers")

        }}
        ><Trash2 size={20} color="#ff0000" strokeWidth={2} /></button>
    )
}

export default Delete