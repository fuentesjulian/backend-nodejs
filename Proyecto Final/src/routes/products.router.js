import { Router } from "express";

const router = Router();

router
  .get("/", (req, res) => {
    res.status(200).send("Listo todos los prods");
  })
  .get("/:pid", (req, res) => {
    const pid = req.params.pid;
    res.status(200).send(`Muestro solo el producto id ${pid}`);
  })
  .post("/", (req, res) => {
    res.status(201).send("Agrego producto");
  })
  .put("/:pid", (req, res) => {
    const pid = req.params.pid;
    res.status(200).send(`Modifico el producto id ${pid}`);
  })
  .delete("/:pid", (req, res) => {
    const pid = req.params.pid;
    res.status(200).send(`Elimino el producto id ${pid}`);
  });

export default router;
