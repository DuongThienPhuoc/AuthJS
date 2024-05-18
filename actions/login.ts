'use server'

import * as z from 'zod'
import {LoginSchema} from "@/schemas";
import {signIn} from "@/auth";

export const login = async (value: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(value);
    if (!validateFields.success) {
        return {error: "Invalid fields"}
    }
    return {success: 'Email Send'}
}

export const loginWithGoogle = async () => {
    await signIn("google", {redirectTo: '/setting'})
}
