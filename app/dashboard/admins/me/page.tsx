'use client'
import { authClient } from '@/lib/auth-client'
import { Mail, Trash, User, Lock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
function page() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [oldPassword, setOldPassword] = useState("")
  let [newPassword, setNewPassword] = useState("")
  useEffect(() => {
    if (!isPending) {
      setName(session!.user.name)
      setEmail(session!.user.email)
    }
  }, [isPending])
  async function update(){
    if(name != session!.user.name)
    await authClient.updateUser({name});
    if(email!=session!.user.email)
    await authClient.changeEmail({newEmail:email});
    if(newPassword !="" || oldPassword!="")
    await authClient.changePassword({newPassword,currentPassword:oldPassword});
  }
  return (
    <>
      <div className="flex items-center  justify-start">
        <button className='btn btn-ghost  text-amber-700 ml-auto mr-40 ' onClick={async () => {

          await authClient.deleteUser()
        }}><Trash ></Trash> </button>

      </div>


        <div className=" flex flex-col text-secondary-content  gap-3 justify-center items-center">
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
          <input type="password" value={oldPassword} placeholder='old password' name='old' autoComplete='' className="grow" onChange={(e)=>{
            setOldPassword(e.target.value)
          }}  />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <Lock></Lock>
          <input type="password" className="grow" value={newPassword} placeholder='new password' onChange={(e)=>{
            setNewPassword(e.target.value)
          }} />
        </label>
        
        <button className="btn btn-outline w-48" onClick={update}>Save</button>
      </div>
    </>
  )
}

export default page