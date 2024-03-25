import { IUser } from "../interfaces/users";
import axios from "axios";

export default async (id: string): Promise<IUser> => {
  try {
    const userService = process.env.USER_SERVICE || "missing";

    const response = await axios.get(`${userService}/${id}`);

    console.log("Success getUserData:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getUserData:", error.code, error.message, id);
    return null;
  }
};
