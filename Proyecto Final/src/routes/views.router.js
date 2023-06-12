// importo el router de express
import { Router } from "express";
// importo el controlador de las vistas
import * as viewsController from "../controllers/views.controller.js";
const router = Router();

router
  .get("/products", viewsController.getAllProducts) // veo todos los productos segun filtros
  .get("/products/new", viewsController.createOneProduct) // vista para crear prods
  .get("/products/:pid", viewsController.getOneProduct) // vista de un prod
  .get("/carts/:cid", viewsController.getOneCart) // vista de una cart
  .get("*", viewsController.notFound); // vista de un not found

export default router;
