import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";
import {AuthError, type DefaultSession, NextAuthConfig} from "next-auth"
import {LoginSchema} from "@/schemas";
import {findUserById, getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";
import {AccessDenied} from "@auth/core/errors";
import {database} from "@/lib/database";

declare module "next-auth" {
    interface Session {
        user: {
            role: "ADMIN" | "USER"
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: "ADMIN" | "USER"
    }
}

export default {
    providers: [Google, GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    }), Credentials({
        authorize: async (credentials) => {
            const validateField = LoginSchema.safeParse(credentials)
            if (validateField.success) {
                const {email, password} = validateField.data;
                const user = await getUserByEmail(email);
                if (!user || !user.password) {
                    return null;
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    return user;
                }
            }
            return null;
        }
    })],
    callbacks: {
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
                session.user.role = token.role
            }
            return session
        },
        async jwt({token, account}) {
            if (!token.sub) {
                return token
            }

            const user = await findUserById(token.sub)

            if (!user) return token

            token.role = user.role;

            return token
        }
    },
    events: {
        async linkAccount({user}) {
            if (user.email && user.email.includes('@fpt.edu.vn')) {
                await database.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        emailVerified: new Date(),
                        role: "ADMIN"
                    }
                })
            }
        }
    },
    pages: {
        signIn: '/auth/error',
        error: '/auth/error',
    }
} satisfies NextAuthConfig