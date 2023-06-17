import { Router } from "express";
import userService from "../services/user.service.js";

const usersRouter = Router();

usersRouter
  .post("/", async (req, res) => {
    try {
      const userData = req.body;
      const { email, password, first_name, last_name, age, img } = req.body;
      if (!email || !password) throw new Error("missing");
      const newUser = await userService.createUser(userData);
      res.redirect(`/register?success=true`);
    } catch (error) {
      if (error.message === "missing" || error.message === "duplicate") {
        res.redirect(`/register?error=${error.message}`);
      } else {
        res.redirect(`/register?error=internal`);
      }
    }
  })
  .post("/auth", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new Error("Invalid data");
      const user = await userService.geyByEmail(email);
      if (!user) throw new Error("User doesnt exist");
      if (user.password !== password) throw new Error("Invalid data");

      req.session.user = user;
      res.redirect("/");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .post("/logout", async (req, res) => {
    req.session.destroy();
    res.redirect("/login");
  });

export default usersRouter;
