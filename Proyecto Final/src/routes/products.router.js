// importo el router de express
import { Router } from "express";
// import el product controller
import * as productsController from "../controllers/products.controller.js";
// creo mi router
const router = Router();
// defino las rutas y metodos
router
  .get("/", productsController.getAll)
  .get("/:pid", productsController.getOne)
  .post("/", productsController.createOne)
  .put("/:pid", productsController.updateOne)
  .delete("/:pid", productsController.deleteOne);

export default router;
