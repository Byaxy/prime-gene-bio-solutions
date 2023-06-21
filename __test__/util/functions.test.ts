import { comparePassword, generatePassword, hashPassword } from "@/util";

describe("tests utility functions", () => {
    it("generates random password", () => {
        let passwordA = generatePassword();
        let passwordB = generatePassword();

        expect(passwordA.length).toBe(8);
        expect(passwordB.length).toBe(8);
        expect(passwordA).not.toEqual(passwordB);
    })

    it("generates random password of specified length", () => {
        let password = generatePassword(15);
        expect(password.length).toBe(15);
    })

    it("compares hashed password to original", async () => {
        let password = generatePassword();
        let hash = await hashPassword(password);
        let result = await comparePassword(password, hash);
        expect(result).toBe(true);
    })
})