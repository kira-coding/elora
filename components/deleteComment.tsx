"use client";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

function deleteComment({ commentId }: { commentId: string }) {

  return (
    <button onClick={async () => {
      const result = await axios.delete("/api/comments/" + commentId,{ headers:{Cookie: "better-auth.session_token="+localStorage.getItem("better-auth.session_token")}})
      if (result.status == 200) {
        toast.success("Comment deleted")
      }
      else {
        toast.error("Failed to delete comment")
      }
      redirect("/dashboard/comments")
    }}
    ><Trash2 size={20} color="#ff0000" strokeWidth={2} /></button>
  )
}

export default deleteComment