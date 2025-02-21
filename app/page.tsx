export const dynamic = 'force-dynamic';
import SignIn from "@/components/sign-in";
import SignUp from "@/components/sign-up";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";


export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  
  let signup=false
  if (!(session?.user)) {
    const users=await prisma.user.findMany({})
    console.dir(users)
        if(users.length<=0){
      signup=true  
        }

    }else{
    redirect("/dashboard",RedirectType.replace)
    }

  return (
    <div className="hero  bg-base-200 min-h-screen">
      <div className="hero-content px-10 flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className=" py-6 text-4xl text-gray-300 md:pr-80 w-56">
            Elora
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

          {signup?<SignUp></SignUp>:<SignIn></SignIn>}
        </div>

      </div>
    </div>
  );
}
