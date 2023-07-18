import { comparePassword, generateRandomString, hashPassword, mockUser, seedMockUser } from "@/utils";

describe("tests utility functions", () => {
    it("generates random string", () => {
        let passwordA = generateRandomString();
        let passwordB = generateRandomString();

        expect(passwordA.length).toBe(8);
        expect(passwordB.length).toBe(8);
        expect(passwordA).not.toEqual(passwordB);
    })

    it("generates random string of specified length", () => {
        let password = generateRandomString(15);
        expect(password.length).toBe(15);
    })

    it("compares hashed password to original", async () => {
        let password = generateRandomString();
        let hash = await hashPassword(password);
        let result = await comparePassword(password, hash);
        expect(result).toBe(true);
    })

    /*it("creates a user", async() => {
        const user = await seedMockUser();
        expect(user).toBeDefined();
        expect(user).toEqual(mockUser);
    })*/
})