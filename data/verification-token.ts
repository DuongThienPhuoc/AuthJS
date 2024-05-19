import {database} from "@/lib/database";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await database.verificationToken.findFirst({
            where: {
                email
            }
        })
    } catch {
        return null
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await database.verificationToken.findUnique({
            where: {
                token
            }
        })
    } catch {
        return null
    }
}