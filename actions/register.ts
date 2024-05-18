'use server'

import * as z from 'zod'
import {database} from "@/lib/database";
import {RegisterSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import bcrypt from 'bcrypt'

export const register = async (value: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(value);
    if (!validateFields.success) {
        return {error: "Invalid fields"}
    }

    const {email, password, name} = validateFields.data;
    const hashPassword = await bcrypt.hash(password, 10)
    const exitingUser = await getUserByEmail(email)
    if (exitingUser) {
        return {error: "Email already in use!"}
    }
    await database.user.create({
        data: {
            email: email,
            password: hashPassword,
            name: name
        }
    })

    //Todo: Send verification token email
    return {success: 'User Created'}
}

