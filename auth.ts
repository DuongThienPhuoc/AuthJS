import NextAuth, {type DefaultSession} from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter";
import {database} from "@/lib/database";
import authConfig from "@/auth.config";
import {findUserById} from "@/data/user";
import {JWT} from "next-auth/jwt"

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(database),
    session: {
        strategy: "jwt"
    },
    ...authConfig
})