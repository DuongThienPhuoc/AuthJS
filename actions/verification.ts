'use server'
import {database} from "@/lib/database";
import {getUserByEmail} from "@/data/user";
import {getVerificationTokenByToken} from "@/data/verification-token";

export const verification = async (token: string) => {
    const exitingToken = await getVerificationTokenByToken(token);

    if (!exitingToken) {
        return {error: "Token not found"};
    }

    const isExpired = new Date(exitingToken.expires) < new Date();

    if (isExpired) {
        return {error: "Token expired"};
    }

    const user = await getUserByEmail(exitingToken.email)

    if (!user) {
        return {error: "Email does not exist"};
    }

    await database.user.update({
        where: {
            id: user.id
        },
        data: {
            emailVerified: new Date(),
            email: exitingToken.email
        }
    })

    await database.verificationToken.delete({
        where: {
            id: exitingToken.id
        }
    })

    return {success: "Email verified"};
}