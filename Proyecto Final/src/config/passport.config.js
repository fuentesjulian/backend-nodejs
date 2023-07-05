import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const jwtStrategy = Strategy;
const jwtExtract = ExtractJwt;

const initPassport = () => {
  passport.use(
    "jwt",
    new jwtStrategy(
      {
        jwtFromRequest: jwtExtract.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      (payload, done) => {
        return done(null, payload);
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

export default initPassport;
