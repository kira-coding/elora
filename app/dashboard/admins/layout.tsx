import { LockKeyhole, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex flex-col">
    <div className="flex justify-center">
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
        <li>
          <Link href={"/dashboard/admins"}>
          <LockKeyhole />
            Admins
            
          </Link>
        </li>
        <li>
          <Link href="/dashboard/admins/me">
          <User/> 
            My Account
          </Link>
        </li>
      </ul>
    </div>
    {children}
    </div>
  )
}

export default layout