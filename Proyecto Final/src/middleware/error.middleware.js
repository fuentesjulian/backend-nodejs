const errorMiddleware = (err, req, res, next) => {
  if (err) {
    if (err.status) {
      res.status(err.status).send({ status: "error", payload: err.message });
    } else {
      console.log(err.message)
      res
        .status(500)
        .send({ status: "error", payload: "internal server error" });
    }
  }
};

export default errorMiddleware;
