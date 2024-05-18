import {database} from "@/lib/database";

export const getUserByEmail = async (email: string) => {
    try {
        return await database.user.findUnique({
            where: {
                email
            }
        });
    } catch {
        return null
    }
}

export const findUserById = async (id: string) => {
    try {
        return await database.user.findUnique({
            where: {
                id
            }
        });
    } catch {
        return null
    }
}