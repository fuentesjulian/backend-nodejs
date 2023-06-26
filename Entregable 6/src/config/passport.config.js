import passport from "passport";
import local from "passport-local";
import userService from "../services/user.service.js";
import { hashPassword, isValidPassword } from "../utils/cipher.utils.js";

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
        console.log("username",username)
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

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userService.getById(id);
    done(null, user);
  });
};

export default initializePassport;
