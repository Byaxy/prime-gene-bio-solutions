import { generatePassword } from "./functions";

export const mockUser = {
    firstname: "jane",
    lastname: "doe",
    email: "jane.doe@gmail.com",
    password: generatePassword(),
}