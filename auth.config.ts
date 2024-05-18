import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import {AuthError, NextAuthConfig} from "next-auth"
import {LoginSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";

export default {
    providers: [Google, Credentials({
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
    })]
} satisfies NextAuthConfig