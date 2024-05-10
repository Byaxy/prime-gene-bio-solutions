import { User, UserRole } from "@/components/Types";
import { generateId } from "@/components/utils";

export const usersData: User[] = [
  {
    id: generateId(),
    name: "Dr. Adam-Yakub A.N.D.",
    email: "owner@tecdiary.com",
    password: "",
    role: UserRole.ADMIN,
    phone: "0881845358",
  },
  {
    id: generateId(),
    name: "Tanisha Bhattacharya",
    email: "tanisha@ubiniumtechsol.com",
    password: "",
    role: UserRole.USER,
    phone: "0776678621",
  },
];
