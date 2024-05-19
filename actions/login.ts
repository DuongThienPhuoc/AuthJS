'use server'

import * as z from 'zod'
import {LoginSchema} from "@/schemas";
import {signIn} from "@/auth";
import {DEFAULT_SUCCESS_LOGIN_REDIRECT} from "@/route";
import {AuthError} from "next-auth";
import {generateVerificationToken} from "@/lib/token";
import {getUserByEmail} from "@/data/user";
import {AccessDenied} from "@auth/core/errors";

export const login = async (value: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(value);
    if (!validateFields.success) {
        return {error: "Invalid fields"}
    }
    const {email, password} = validateFields.data;
    const exitingUser = await getUserByEmail(email);

    if (!exitingUser || !exitingUser.email || !exitingUser.password) {
        return {error: "Email is not exits"}
    }

    // if (!exitingUser.emailVerified) {
    //     const token = await generateVerificationToken(email);
    //     return {success: "Confirmation email sent!"}
    // }

    try {
        await signIn("credentials", {email, password, redirectTo: DEFAULT_SUCCESS_LOGIN_REDIRECT})
    } catch (e) {
        if (e instanceof AccessDenied) {
            return {error: "Email is not verified"}
        } else if (e instanceof AuthError) {
            return {error: "Invalid email or password"}
        }
        throw e
    }
}

export const loginWithProvider = async (provider: 'google' | 'github') => {
    await signIn(provider, {
            callbackUrl: DEFAULT_SUCCESS_LOGIN_REDIRECT
        }
    )
}