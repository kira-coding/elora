"use client";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";


function DeleteComment({ commentId }: { commentId: string }) {
  const router=useRouter();
  return (
    <button onClick={async () => {
       await axios.delete("/api/comments/" + commentId,{ headers:{Cookie: "better-auth.session_token="+localStorage.getItem("better-auth.session_token")}})
    router.push("/dashboard/comments")
    }}
    ><Trash2 size={20} color="#ff0000" strokeWidth={2} /></button>
  )
}

export default DeleteComment