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
                    id: user.id,
                    name: user.username,
                    email: user.email
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
            }
            return token
        },

        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.email = token.email;

            return session
        }
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }