import { Router } from "express";
import userService from "../services/user.service.js";
import passport from "passport";
import asPOJO from "../utils/asPOJO.utils.js";

const usersRouter = Router();

usersRouter
  .post(
    "/",
    passport.authenticate("register", {
      failureRedirect: "/api/users/failregister",
    }),
    async (req, res) => {
      let user = asPOJO(req.user);
      delete user.password;
      delete user.__v;
      req.session.user = user;
      res.status(201).send({ status: "success", payload: "User registered" });
    }
  )
  .get("/failregister", (req, res) => {
    
    res.status(400).send({ status: "error", payload: "User already exists" });
  })
  .post(
    "/auth",
    passport.authenticate("login", { failureRedirect: "/api/users/failauth" }),
    (req, res) => {
      if (!req.user)
        return res
          .status(400)
          .send({ status: "error", payload: "Cannot authenticate" });
      let user = asPOJO(req.user);
      delete user.password;
      delete user.__v;
      req.session.user = user;
      res.status(201).send({ status: "success", payload: "User logged in" });
    }
  )
  .get("/failauth", (req, res) => {
    res.status(400).send({ status: "error", payload: "Cannot authenticate" });
  })
  .post("/logout", async (req, res) => {
    req.session.destroy();
    res.redirect("/login");
  });

export default usersRouter;
