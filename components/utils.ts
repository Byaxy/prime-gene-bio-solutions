import { v4 as uuidv4} from "uuid";

export const generateId = () => {
  return uuidv4().split("-")[0];
};