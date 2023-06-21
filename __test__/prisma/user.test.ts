import { hashPassword, mockUser } from "@/utils";
import { PrismaClient } from "@prisma/client";

describe("tests CRUD ops on user model", () => {
    let prisma: PrismaClient;

    beforeAll(() => {
        prisma = new PrismaClient();
    });

    afterAll(async () => {
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    it("creates a user", async() => {
        await prisma.user.create({
            data: { 
                ...mockUser, 
                password: (await hashPassword(mockUser.password)) 
            }
        });

        const results = await prisma.user.findMany();
        expect(results).toHaveLength(1);
    })

    it("throws due to duplicate email", async () => {
        await expect(async () => {
            await prisma.user.create({
                data: { 
                    ...mockUser, 
                    password: (await hashPassword(mockUser.password)) 
                }
            });
        }).rejects.toThrow();
    })
})