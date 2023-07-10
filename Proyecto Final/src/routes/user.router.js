import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";
const userRouter = Router();

userRouter
  .post("/register", userController.register)
  .post("/login", userController.login)
  .post("/logout", userController.logout)
  .get("/current", jwtMiddleware, userController.current);

export default userRouter;
