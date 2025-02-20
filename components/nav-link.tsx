'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'


function NavLink({href,children}:{href:string,children:ReactNode}) {
    const pathname=usePathname()
  return (
    <Link href={href} className={pathname==href?"text-yellow-500":""}>{children}</Link>
  )
}

export default NavLink