import CustomError from "../utils/CustomError.utils.js";
import * as userService from "../services/user.service.js";

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, age, email, password, img } = req.body;
    if (!email || !password)
      throw new CustomError(400, "Email and password are required");
    const userData = { first_name, last_name, age, email, password, img };
    const user = await userService.register(userData);
    res.status(201).send({ status: "success", payload: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
