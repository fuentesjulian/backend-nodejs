import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ msg: "Probando get" });
});

export default router;
