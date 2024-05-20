import {database} from "@/lib/database";

export async function getResetPasswordTokenByEmail(email: string) {
    try {
        return await database.passwordResetToken.findFirst({
            where: {
                email
            }
        })
    } catch {
        return null
    }
}

export async function getResetPasswordTokenByToken(token: string) {
    try {
        return await database.passwordResetToken.findUnique({
            where: {
                token
            }
        })
    } catch {
        return null
    }
}
