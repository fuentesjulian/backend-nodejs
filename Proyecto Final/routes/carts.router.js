import { Router } from "express";

const router = Router();

router
  .post("/", (req, res) => {
    res.status(201).send("Creo un nuevo cart");
  })
  .get("/:cid", (req, res) => {
    const cid = req.params.cid;
    res.status(200).send(`Obtengo cart ${cid}`);
  })
  .post("/:cid/product/:pid", (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    res.status(201).send(`Agrego cantidad de prod id ${pid} en el cart ${cid}`);
  });

export default router;
