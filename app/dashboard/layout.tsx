import type { Metadata } from "next";

import "@/app/globals.css";
import Theme from "@/components/theme";
import NavLink from "@/components/nav-link";
import Logout from "@/components/logout";
import Link from "next/link";







export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-accent btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-accent-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><NavLink href={"/dashboard/admins"}  >Admins</NavLink></li>
              <li><NavLink href={"/dashboard/categories"}  >Categories</NavLink></li>
              <li><NavLink href={"/dashboard/volunteers"}  >Volunteers</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn text-purple-600 text-xl">Elora</Link>
        </div>
        <div className="navbar-end">
          <Theme></Theme>
          <Logout></Logout>
        </div>
      </div>
      <main>
        <div className="card bg-base-100 w-full h-5/6 block shadow-xl">
          <div className="card-body">
            {children}
          </div>
        </div>

      </main>

    </>
  );
}
