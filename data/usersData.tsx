import { Gender, User, UserRole } from "@/components/Types";
import { generateId } from "@/components/utils";

export const usersData: User[] = [
  {
    id: generateId(),
    image: "/user.png",
    firstName: "Dr. Adam-Yakub",
    lastName: "A.N.D.",
    email: "owner@tecdiary.com",
    password: "",
    role: UserRole.ADMIN,
    phone: "0881845358",
    gender: Gender.MALE,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    image: "/user.png",
    firstName: "Tanisha",
    lastName: "Bhattacharya",
    email: "tanisha@ubiniumtechsol.com",
    password: "",
    role: UserRole.USER,
    phone: "0776678621",
    gender: Gender.FEMALE,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];
