'use server'

import * as z from 'zod'
import {ChangePasswordSchema, ForgotPasswordSchema} from '@/schemas'
import {getUserByEmail} from "@/data/user";
import {getResetPasswordTokenByToken} from "@/data/reset-password-token";
import {generateResetPasswordToken} from "@/lib/token";
import {sendResetPasswordEmail} from "@/lib/mail";
import {database} from "@/lib/database";
import bcrypt from "bcryptjs";

export async function resetPassword(value: z.infer<typeof ForgotPasswordSchema>) {
    const validatedFields = ForgotPasswordSchema.safeParse(value)
    if (!validatedFields.success) {
        return {error: 'Invalid email!'}
    }
    const {email} = validatedFields.data
    const user = await getUserByEmail(email)
    if (!user) {
        return {error: 'Email not found!'}
    }

    const token = await generateResetPasswordToken(email)
    await sendResetPasswordEmail(token.email, token.token)

    return {success: 'Reset password email sent!'}
}

export async function changePassword(value: z.infer<typeof ChangePasswordSchema>, token?: string) {
    if (!token) {
        return {error: 'Missing Token!'}
    }
    const validatedField = ChangePasswordSchema.safeParse(value)
    if (!validatedField.success) {
        return {error: 'Invalid Field!'}
    }

    const {password} = validatedField.data
    const hashPassword = await bcrypt.hash(password, 10)

    const exitingToken = await getResetPasswordTokenByToken(token);
    if (!exitingToken) {
        return {error: 'Invalid Token'}
    }

    const isExpires = new Date(exitingToken.expires) < new Date()
    if (isExpires) {
        return {error: 'Expired Token!'}
    }

    const exitingUser = await getUserByEmail(exitingToken.email);
    if (!exitingUser) {
        return {error: 'Invalid Email!'}
    }

    await database.user.update({
        where: {
            id: exitingUser.id
        },
        data: {
            password: hashPassword
        }
    })
    await database.passwordResetToken.delete({
        where: {
            id: exitingToken.id
        }
    })

    return {success: 'Change Password Successfully!'}
}