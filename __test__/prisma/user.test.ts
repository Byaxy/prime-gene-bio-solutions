import { hashPassword, mockUser } from "@/utils";
import { PrismaClient } from "@prisma/client";

describe("tests CRUD ops on user model", () => {
    let prisma: PrismaClient;
    let userId: string;

    beforeAll(() => {
        prisma = new PrismaClient();
    });

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                id: userId
            }
        });
        await prisma.$disconnect();
    });

    it("creates a user", async() => {
        const usersCount = await prisma.user.count();
        const { id } = await prisma.user.create({
            data: { 
                ...mockUser, 
                password: (await hashPassword(mockUser.password)) 
            }
        });

        userId = id;

        const results = await prisma.user.findMany();
        expect(results).toHaveLength(usersCount + 1);
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