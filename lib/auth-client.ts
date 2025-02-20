import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({baseURL:"https://elora-teal.vercel.app/"})
export const {

    signIn,

    signOut,

    signUp,

    useSession

} = authClient;