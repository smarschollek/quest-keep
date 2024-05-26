import { getUserFromDb } from "@/utils/db"
import { comparePassword, hashPassword } from "@/utils/password"
import { is } from "drizzle-orm"
import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials) : Promise<User> => {

            if(typeof credentials.email !== 'string' || typeof credentials.password !== 'string' ) {
                throw new Error('Missing credentials')
            }

            const user = await getUserFromDb(credentials.email)

            if(!user) {
                throw new Error('No user found')
            }

            const isPasswordValid = await comparePassword(credentials.password, user.password!)

            if(isPasswordValid === false) {
                throw new Error('Password or EMail does not match')
            }

            return {
                id: user.id.toString(),
                email: user.email,
                name: user.name
            }
        },
    })
  ],
  callbacks: {
    // redirect: async () => {
    //     return '/'
    // },
    session: async ({session, token}) => {
        session.user.id = token.sub
        return session
    }
  }
})