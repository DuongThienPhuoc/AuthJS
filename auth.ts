import NextAuth from "next-auth"
import Google from "@auth/core/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {database} from "@/lib/database";
import authConfig from "@/auth.config";

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(database),
    session: {strategy: "jwt"},
    ...authConfig
})