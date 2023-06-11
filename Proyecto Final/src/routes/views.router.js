// importo el router de express
import { Router } from "express";
// importo el controlador de las vistas
import * as viewsController from "../controllers/views.controller.js";
const router = Router();

router
  .get("/products", viewsController.getAllProducts)
  .get("/products/new", viewsController.createOneProduct)
  .get("/products/:pid", viewsController.getOneProduct)
  .get("/carts/:cid", viewsController.getOneCart)
  .get("*", viewsController.notFound);

export default router;
