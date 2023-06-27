import { Router } from "express";
import passport from "passport";

const githubRouter = Router();

githubRouter.get(
  "/auth",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

githubRouter.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

export default githubRouter;
