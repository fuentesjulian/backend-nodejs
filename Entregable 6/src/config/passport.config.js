import passport from "passport";
import local from "passport-local";
import userService from "../services/user.service.js";
import { hashPassword, isValidPassword } from "../utils/cipher.utils.js";
import GitHubStrategy from "passport-github2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, age, email, img } = req.body;
        try {
          const user = await userService.getByEmail(email);
          if (user) return done(null, false);

          const userData = {
            first_name,
            last_name,
            age,
            email: username,
            img,
            password: hashPassword(password),
          };
          const newUser = await userService.createUser(userData);
          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userService.getByEmail(username);
          if (!user) return done(null, false);
          const isAuth = isValidPassword(user, password);
          if (!isAuth) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userService.getByEmail(profile._json.email);
          if (!user) {
            const userData = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              password: "",
              img: profile._json.avatar_url,
            };
            const newUser = await userService.createUser(userData);
            return done(null, newUser);
          } else {
            return done(null, user);
          }
        } catch (error) {
          done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.getById(id);

    if (
      user.email === "adminCoder@coder.com" &&
      bcrypt.compareSync("adminCod3r123", user?.password)
    )
      user.role = "admin";

    return done(null, user);
  });
};

export default initializePassport;
