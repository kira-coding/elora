'use client'
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { Mail, Trash, User, Lock ,Save} from 'lucide-react'
import { useEffect, useState } from 'react'
function Me() {

  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  useEffect(() => {
    if (!isPending) {
      setName(session!.user.name)
      setEmail(session!.user.email)
    }
  }, [isPending, session])
  async function update() {
    if (name != session!.user.name)
      await authClient.updateUser({ name });
    if (email != session!.user.email)
      await authClient.changeEmail({ newEmail: email });
    if (newPassword != "" || oldPassword != "")
      await authClient.changePassword({ newPassword, currentPassword: oldPassword });
  }
  return (
    <>


      <div className=" flex flex-col text-secondary-content  mt-5 gap-3 justify-center items-center">
        <label className="input input-bordered flex items-center gap-2">
          <Mail></Mail>
          <input type="text" value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} className="grow" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <User></User>
          <input type="text" value={name} onChange={(e) => {
            setName(e.target.value)
          }} className="grow" placeholder="Username" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <Lock></Lock>
          <input type="password" value={oldPassword} placeholder='old password' name='old' autoComplete='' className="grow" onChange={(e) => {
            setOldPassword(e.target.value)
          }} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <Lock></Lock>
          <input type="password" className="grow" value={newPassword} placeholder='new password' onChange={(e) => {
            setNewPassword(e.target.value)
          }} />
        </label>
        <div className="felx justify-center items-center  ">
          <button className="btn btn-outline mr-5 text-amber-500" onClick={update}> <Save></Save> Save</button>
          <button className='btn btn-outline text-accent-content '
            onClick={async () => {

              await authClient.deleteUser()
            }}>
            <Trash ></Trash>
            Delete 
          </button>
        </div>
      </div>
    </>
  )
}

export default Me