import User from "../models/User.js";
import CustomError from "../utils/CustomError.utils.js";

export const register = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (user) throw new CustomError(400, "User already exists");
  const newUser = await User.create(userData);
  return newUser;
};
