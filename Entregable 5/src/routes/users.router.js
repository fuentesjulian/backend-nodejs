import { Router } from "express";
import userService from "../services/user.service.js";

const usersRouter = Router();

usersRouter
  .post("/", async (req, res) => {
    try {
      const userData = req.body;
      const { email, password, first_name, last_name, age, img } = req.body;
      if (!email || !password)
        throw new Error("email and password are required");
      const newUser = await userService.createUser(userData);
      res.status(201).send({ status: "success" });
    } catch (error) {
      res.status(400).send({ status: "error", payload: error.message });
    }
  })
  .post("/auth", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new Error("user and email are required");
      const user = await userService.geyByEmail(email);
      if (!user) throw new Error("invalid credentials");
      if (user.password !== password) throw new Error("invalid credentials");
      let userObj = JSON.parse(JSON.stringify(user));
      if (
        userObj.email === "adminCoder@coder.com" &&
        userObj.password === "adminCod3r123"
      )
        userObj.role = "admin";
      delete userObj.password;
      req.session.user = userObj;
      res.status(201).send({ status: "success" });
    } catch (error) {
      res.status(400).send({ status: "error", payload: error.message });
    }
  })
  .post("/logout", async (req, res) => {
    req.session.destroy();
    res.redirect("/login");
  });

export default usersRouter;
