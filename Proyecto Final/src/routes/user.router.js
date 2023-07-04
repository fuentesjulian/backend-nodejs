import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter
  .post("/register", userController.register)
  .post("/login", userController.login)
  .post("/logout");

export default userRouter;
