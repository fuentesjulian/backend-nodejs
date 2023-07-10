import passport from "passport";

const userMiddleware = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, usr, info) => {
    if (err) {
      return next(err);
    }
    if (usr) req.user = usr;
    next();
  })(req, res, next);
};

export default userMiddleware;
