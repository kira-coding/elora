'use client';
import axios from "axios";
import { FolderClosed, FolderPlus, Pencil, PencilLine, Trash2, UserPlus, UserRound } from "lucide-react";
import { redirect } from "next/navigation";
import {   useState } from "react";


export interface Category {
  id: string;
  name: string;
  tgAccounts?: { id: string; name: string; username: string }[];
  subcategories?: Category[];
  parentId?: string;
}

export default function CategoryItem({ category }: { category: Category }) {
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountUserName, setAccountUserName] = useState("");

  async function createFolder() {
    await axios.post(`/api/categories/`,
       {
      name: folderName,id:folderId, headers: {
        Cookie:"better-auth.session_token="+localStorage.getItem("better-auth.session_token")
      },
    });
    redirect("/dashboard/categories")
  }
  async function deleteFolder() {
    await axios.post(`/api/categories/delete/`, {
      id:folderId,
      headers: {
         Cookie:"better-auth.session_token="+localStorage.getItem("better-auth.session_token")
      },
    });
    redirect("/dashboard/categories")
  }
  async function renameFolder() {
    await axios.patch("/api/categories/" , {
      name: folderName,
      id:folderId,
       headers: {
         Cookie:"better-auth.session_token="+localStorage.getItem("better-auth.session_token")
      },
    });
    redirect("/dashboard/categories")
   }
  async function addAccount() {
    await axios.post(`/api/tg_accounts/`, {
      id: folderId, headers: {
         Cookie:"better-auth.session_token="+localStorage.getItem("better-auth.session_token")
      }, display_name: accountName, username: accountUserName
    });
    redirect("/dashboard/categories")
  }
  async function deleteAccount() {
    const res =await axios.delete(`/api/tg_accounts/`, {
      data: { id: accountId }, headers: {
         Cookie:"better-auth.session_token="+localStorage.getItem("better-auth.session_token")
      },
    })
    alert(res.data.message);
    
    redirect("/dashboard/categories")

  }
  async function renameAccount() {
    await axios.patch(`/api/tg_accounts/`, {
      id: accountId, username: accountUserName, display_name: accountName   ,  headers: {
         Cookie:"better-auth.session_token="+localStorage.getItem("better-auth.session_token")
      },
    })
    redirect("/dashboard/categories")
  }

  return (
    <>
      <li>
        <details open>
          <summary >
            <FolderClosed color="#f5c211" strokeWidth={3} />
            {category.name}
            <ul className="menu menu-horizontal  bg-base-100 rounded-box ">
              <li>
                <button onClick={() => {
                  const modal = document.getElementById("r"+category.id) as HTMLDialogElement | null;
                  setFolderId(category.id);
                  setFolderName(category.name);
                  modal?.showModal();
                }}>
                  <dialog id={"r"+category.id} className="modal flex items-center justify-center">
                    <div className="modal-box flex flex-col gap-4 p-4 bg-secondary rounded-box">
                      <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" name="newname" value={folderName} onChange={(e) => setFolderName(e.target.value)} className="grow" placeholder="New volunteer name" />
                      </label>
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
                  <Pencil color="#9a9996" size={14} />
                </button>
              </li>
              <li>
                <button onClick={async () => {
                  setFolderId(category.id);

                  await deleteFolder();

                }}>
                  <Trash2 color="#9a9996" size={14} />
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const modal = document.getElementById(category.id) as HTMLDialogElement | null;
                  setFolderId(category.id);
                  modal?.showModal();
                }}>
                  <dialog id={category.id} className="modal flex items-center justify-center">
                    <div className="modal-box flex flex-col gap-4 p-4 bg-secondary rounded-box">
                      <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" name="newname" value={folderName} onChange={(e) => setFolderName(e.target.value)} className="grow" placeholder="New volunteer name" />
                      </label>
                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-2">
                            <button className="btn" onClick={() => {
                              createFolder();
                              redirect("/dashboard/categories");
                            }}>Create</button>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button></div>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <FolderPlus color="#9a9996" size={14} />
                </button>
              </li>
              <li>
                <button onClick={() => {
                  setFolderId(category.id);
                  const modal = document.getElementById(`user${category.id}`) as HTMLDialogElement | null;
                  modal?.showModal();
                }}>
                  <dialog id={`user${category.id}`} className="modal flex items-center justify-center">
                    <div className="modal-box flex flex-col gap-4 p-4 bg-secondary rounded-box">
                      <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" name="newname" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="grow" placeholder="New volunteer name" />
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        @
                        <input type="text" name="newusername" value={accountUserName} onChange={(e) => setAccountUserName(e.target.value)} className="grow" placeholder="username" />
                      </label>
                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-2">
                            <button className="btn" onClick={() => {
                              addAccount();
                              redirect("/dashboard/categories");
                            }}>Add</button>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button></div>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <UserPlus size={16} color="#9a9996" strokeWidth={3} />
                </button>
              </li>
            </ul>
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
                      {account.name} ({account.username})
                      <ul className="menu menu-horizontal  bg-base-100 rounded-box ">
                        <li>
                          <button onClick={() => {
                            const modal = document.getElementById(account.id) as HTMLDialogElement | null;
                            modal?.showModal();
                            setAccountId(account.id);
                            setAccountName(account.name);
                            setAccountUserName(account.username);
                          }}>
                            `<PencilLine size={12} color="#9a9996" />`
                          </button>
                          <dialog id={account.id} className="modal flex items-center justify-center">
                            <div className="modal-box flex flex-col gap-4 p-4 bg-secondary rounded-box">
                              <label className="input input-bordered flex items-center gap-2">
                                Name
                                <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="grow" placeholder="New volunteer name" />
                              </label>
                              <label className="input input-bordered flex items-center gap-2">
                                @
                                <input type="text" value={accountUserName} onChange={(e) => setAccountUserName(e.target.value)} className="grow" placeholder="username" />
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
                          <button onClick={() => {
                            setAccountId(account.id);
                            deleteAccount();
                          }}>
                            <Trash2 color="#9a9996" size={14} />
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
    </>
  );
}
