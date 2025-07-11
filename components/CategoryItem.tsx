'use client';
import axios from "axios";
import { FolderClosed, FolderPlus, Pencil, PencilLine, Trash2, UserPlus, UserRound, AtSign, Menu } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";


export interface Category {
  id: string;
  name: string;
  tgAccounts?: { id: string; name: string; username: string, description: string }[];
  subcategories?: Category[];
  description: string
  parentId?: string;
}

export default function CategoryItem({ category }: { category: Category }) {
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("")
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountUserName, setAccountUserName] = useState("");
  const [accountDescription, setAccountDescription] = useState("")
  const router = useRouter()

  async function createFolder() {
    await axios.post(`/api/categories/`,
      {
        name: folderName, id: folderId,
        description: categoryDescription,
        headers: {
          Cookie: "better-auth.session_token=" + localStorage.getItem("better-auth.session_token")
        },
      });
    router.push("/dashboard/categories")
  }
  async function deleteFolder() {
    await axios.post(`/api/categories/delete/`, {
      id: folderId,
      headers: {
        Cookie: "better-auth.session_token=" + localStorage.getItem("better-auth.session_token")
      },
    })

    router.push("/dashboard/categories")



  }
  async function renameFolder() {
    await axios.patch("/api/categories/", {
      name: folderName,
      id: folderId,
      description: categoryDescription,
      headers: {
        Cookie: "better-auth.session_token=" + localStorage.getItem("better-auth.session_token")
      },
    });
    router.push("/dashboard/categories")
  }
  async function addAccount() {
    await axios.post(`/api/tg_accounts/`, {
      id: folderId, headers: {
        Cookie: "better-auth.session_token=" + localStorage.getItem("better-auth.session_token")
      }, display_name: accountName, username: accountUserName, description: accountDescription
    });
    router.push("/dashboard/categories")
  }
  async function deleteAccount() {
    await axios.delete(`/api/tg_accounts/`, {
      data: { id: accountId }, headers: {
        Cookie: "better-auth.session_token=" + localStorage.getItem("better-auth.session_token")
      },
    })
    router.push("/dashboard/categories")

  }
  async function renameAccount() {
    await axios.patch(`/api/tg_accounts/`, {
      id: accountId, username: accountUserName, display_name: accountName, description: accountDescription, headers: {
        Cookie: "better-auth.session_token=" + localStorage.getItem("better-auth.session_token")
      },
    })
    router.push("/dashboard/categories")
  }

  return (
    <li key={category.id} id={`category-${category.id}`}>
      <dialog id={"r" + category.id} className="modal flex items-center justify-center">
        <div className="modal-box flex flex-col gap-4 p-4 bg-secondary rounded-box">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" name="newname" value={folderName} onChange={(e) => setFolderName(e.target.value)} className="grow" placeholder="Category" />
          </label>
          <label htmlFor="description" className='mb-0 pb-0'>Description*</label>
          <textarea className='textarea textarea-bordered' id='description' value={categoryDescription || ""} onChange={(e) => setCategoryDescription(e.target.value)}>
          </textarea>

          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-2">
                <button className="btn" onClick={() => {
                  renameFolder();
                }}>save</button>
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button></div>
            </form>
          </div>
        </div>
      </dialog>
      <details open>
        <summary >
          <FolderClosed color="#f5c211" strokeWidth={3} />
          {category.name}
          <div className=" dropdown  dropdown-left text-accent-content m-3 ">
            <button tabIndex={2} role="button" className="btn btn-ghost  p-0 m-0">
              <Menu size={24} fontWeight={"bold"} ></Menu>

            </button>
            <ul  tabIndex={2} className="dropdown-content bg-base-300  rounded-box z-[4]  shadow-2xl">
              <li>
                <button onClick={() => {
                  const modal = document.getElementById("r" + category.id) as HTMLDialogElement | null;
                  setFolderId(category.id);
                  setFolderName(category.name);
                  setCategoryDescription(category.description)
                  modal?.showModal();
                }}>

                  <Pencil color="#9a9996" size={16} />
                </button>
              </li>
              <li>

                <button onClick={async () => {

                  setFolderId(category.id)
                  await deleteFolder()

                }}>
                  <Trash2 color="#9a9996" size={16} />
                </button>

              </li>
              <li>
                <button onClick={() => {
                  const modal = document.getElementById(category.id) as HTMLDialogElement | null;
                  setFolderId(category.id);
                  modal?.showModal();
                }}>

                  <FolderPlus color="#9a9996" size={16} />
                </button>
                <dialog id={category.id} className="modal flex items-center justify-center">
                  <div className="modal-box flex flex-col gap-4 p-4 bg-secondary rounded-box">
                    <label className="input input-bordered flex items-center gap-2">
                      Name
                      <input type="text" name="newname" value={folderName} onChange={(e) => setFolderName(e.target.value)} className="grow" placeholder="Category Name" />
                    </label>
                    <label htmlFor="description" className='mb-0 pb-0'>Description*</label>
                    <textarea className='textarea textarea-bordered' id='description' value={categoryDescription || ""} onChange={(e) => setCategoryDescription(e.target.value)}>
                    </textarea>
                    <div className="modal-action">
                      <form method="dialog">
                        <div className="flex gap-2">
                          <button className="btn" onClick={() => {
                            createFolder();
                            router.push("/dashboard/categories");
                          }}>Create</button>
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button></div>
                      </form>
                    </div>
                  </div>
                </dialog>
              </li>
              <li>
                <button onClick={() => {
                  setFolderId(category.id);
                  const modal = document.getElementById(`user${category.id}`) as HTMLDialogElement | null;
                  modal?.showModal();
                }}>

                  <UserPlus size={16} color="#9a9996" strokeWidth={3} />
                </button>
                <dialog id={`user${category.id}`} className="modal flex items-center justify-center">
                  <div className="modal-box flex flex-col gap-4 p-4 bg-secondary rounded-box">
                    <label className="input input-bordered flex items-center gap-2">
                      Name
                      <input type="text" name="newname" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="grow" placeholder="Diplay Name. eg John" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      @
                      <input type="text" name="newusername" value={accountUserName} onChange={(e) => setAccountUserName(e.target.value)} className="grow" placeholder="username" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      Description*
                      <input type="text" value={accountDescription} onChange={(e) => setAccountDescription(e.target.value)} className="grow" placeholder="Optional" />
                    </label>
                    <div className="modal-action">
                      <form method="dialog">
                        <div className="flex gap-2">
                          <button className="btn" onClick={() => {
                            addAccount();
                            router.push("/dashboard/categories");
                          }}>Add</button>
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button></div>
                      </form>
                    </div>
                  </div>
                </dialog>
              </li>
            </ul>
          </div>
        </summary>
        <ul>
          {category.subcategories && category.subcategories.length > 0 && (
            <>
              {category.subcategories.map((subcat: Category) => (
                <CategoryItem key={subcat.id} category={subcat} />
              ))}
            </>
          )}
          {category.tgAccounts && category.tgAccounts.length > 0 && (
            <>
              {category.tgAccounts.map((account) => (
                <li key={account.id}>


                  <a>

                    <UserRound color="#f5c211" strokeWidth={3} />
                    {account.name} <span> @{account.username}</span>
                    <ul className="menu menu-horizontal  w-fit  bg-base-100 rounded-box ">
                      <li>

                        <button onClick={() => {
                          const modal = document.getElementById(account.id) as HTMLDialogElement | null;
                          modal?.showModal();
                          setAccountId(account.id);
                          setAccountName(account.name);
                          setAccountUserName(account.username);
                          setAccountDescription(account.description)
                        }}>
                          <PencilLine size={12} color="#9a9996" />
                        </button>
                        <dialog id={account.id} className="modal flex items-center justify-center">
                          <div className="modal-box flex flex-col gap-4 p-4 bg-secondary rounded-box">
                            <label className="input input-bordered flex items-center gap-2">
                              Name
                              <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="grow" placeholder="DisplayName" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                              @
                              <input type="text" value={accountUserName} onChange={(e) => setAccountUserName(e.target.value)} className="grow" placeholder="username" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                              Description*
                              <input type="text" value={accountDescription} onChange={(e) => setAccountDescription(e.target.value)} className="grow" placeholder="Optional" />
                            </label>
                            <div className="modal-action">
                              <form method="dialog">
                                <div className="flex gap-2">
                                  <button className="btn" onClick={() => {
                                    renameAccount();
                                    setAccountName("");
                                    setAccountUserName("");
                                    setAccountId("");

                                  }}>save</button>
                                  {/* if there is a button in form, it will close the modal */}
                                  <button className="btn">Close</button></div>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </li>
                      <li>
                        <button key={account.id} onClick={async (e) => {
                          setAccountId(account.id);
                          await deleteAccount();

                        }}>
                          <Trash2 color="#9a9996" size={16} />
                        </button>
                      </li>
                    </ul>
                  </a>
                </li>
              ))}
            </>
          )}
        </ul>

      </details>
    </li >

  );
}
