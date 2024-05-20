import {v4 as uuid} from 'uuid'
import {getVerificationTokenByEmail} from "@/data/verification-token";
import {database} from "@/lib/database";
import {getResetPasswordTokenByEmail} from "@/data/reset-password-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const exitingToken = await getVerificationTokenByEmail(email);
    if (exitingToken) {
        await database.verificationToken.delete({
            where: {
                id: exitingToken.id
            }
        })
    }
    return database.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });
}

export const generateResetPasswordToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const exitingToken = await getResetPasswordTokenByEmail(email);

    if (exitingToken) {
        await database.passwordResetToken.delete({
            where: {
                id: exitingToken.id
            }
        })
    }
    return database.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })
}