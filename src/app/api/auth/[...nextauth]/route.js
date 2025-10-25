import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByEmail } from "@/lib/actions"
import { compare } from "bcryptjs"


export const authOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                //1. unboxing data credentials
                const email = credentials.email
                const password = credentials.password

                //2. mencari user berdasarkan email
                const user = await getUserByEmail(email)

                if (!user) return null

                //3. cek password
                const isValid = await compare(password, user.password)

                if (!isValid) return null

                //4. simpan data ke session
                return {
                    name: user.name,
                    email: user.email
                }

            }
        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }