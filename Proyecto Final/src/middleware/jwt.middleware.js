import passport from "passport";

const jwtMiddleware = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, usr, info) => {
    if (err) {
      return next(err);
    }

    if (!usr) {
      return res.status(401).send({
        message: info.messages ? info.messages : info.toString(),
      });
    }

    req.user = usr;
    next();
  })(req, res, next);
};

export default jwtMiddleware;
