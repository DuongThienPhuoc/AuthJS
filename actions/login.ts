'use server'

import * as z from 'zod'
import {LoginSchema} from "@/schemas";
import {signIn} from "@/auth";
import {DEFAULT_SUCCESS_LOGIN_REDIRECT} from "@/route";
import {AuthError} from "next-auth";

export const login = async (value: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(value);
    if (!validateFields.success) {
        return {error: "Invalid fields"}
    }
    const {email, password} = validateFields.data;
    try {
        await signIn("credentials", {email, password, redirectTo: DEFAULT_SUCCESS_LOGIN_REDIRECT})
    } catch (e) {
        if (e instanceof AuthError) {
            return {error: "Invalid credentials"}
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