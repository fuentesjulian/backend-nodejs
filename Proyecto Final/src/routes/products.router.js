// importo el router de express
import { Router } from "express";
// import el product controller
import * as productsController from "../controllers/products.controller.js";
// creo mi router
const router = Router();
// defino las rutas y metodos
router
  .get("/", productsController.getAll) // todos los productos
  .get("/:pid", productsController.getOne) // un solo producto por id
  .post("/", productsController.createOne) // crea un producto
  .put("/:pid", productsController.updateOne) // actualiza producto
  .delete("/:pid", productsController.deleteOne); // elimina producto por id

export default router;
