import dotenv from "dotenv";
import asPOJO from "./asPOJO.utils.js";
import jwt from "jsonwebtoken";

dotenv.config();

const generateToken = (user) => {
  user = asPOJO(user);
  delete user.password;
  delete user.__v;
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export default generateToken;
