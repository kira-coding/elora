"use client";
import axios from 'axios';
import { FolderPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function AddCategoryItem() {
  const router = useRouter();
  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");
  async function createFolder() {
    await axios.post(`/api/categories/`, {
      name: folderName, id: 5,description,  headers: {
        Cookie: "better-auth.session_token=" + localStorage.getItem("better-auth.session_token")
      }
    });
    router.replace("/dashboard/categories");
  }
  return (
    <>
      <button className="btn" onClick={() => {
        const modal = document.getElementById("add_category_modal") as HTMLDialogElement | null;
        modal?.showModal();
      }}><FolderPlus /></button>
      <dialog id="add_category_modal" className="modal flex items-center justify-center">
        <div className="modal-box flex flex-col gap-4 p-4 bg-secondary rounded-box">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" name="newname" value={folderName} onChange={(e) => setFolderName(e.target.value)} className="grow" placeholder="Category Name" />
          </label>
          <label htmlFor="description" className='mb-0 pb-0'>Description*</label>
          <textarea className='textarea textarea-bordered' id='description' value={description} onChange={(e) => setDescription(e.target.value)}>
          </textarea>

          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-2">
                <button className="btn" onClick={async () => {
                  await createFolder();
                }}>Create</button>
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button></div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default AddCategoryItem