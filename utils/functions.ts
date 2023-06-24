import bcrypt from "bcrypt";

export function generatePassword(length: number = 8): string {
    let chars: string = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password: string = "";

    for (let i = 0; i < length; i++) {
        let r = Math.floor(Math.random() * chars.length);
        password += chars[r];
    }

    return password;
}

export async function hashPassword(password: string | undefined, saltRounds: number = 11): Promise<string> {
    if (!password) throw new Error("Password cannot be null or undefined");
    return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string | undefined, hash: string): Promise<boolean> {
    if (!password) return false;
    return bcrypt.compare(password, hash);
}