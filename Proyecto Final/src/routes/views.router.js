// importo el router de express
import { Router } from "express";
// importo el controlador de las vistas
import * as viewsController from "../controllers/views.controller.js";
import { isAuth, isGuest } from "../middleware/auth.middleware.js";
const router = Router();

router
  .get("/", viewsController.home)
  .get("/products", viewsController.getAllProducts) // veo todos los productos segun filtros
  .get("/products/new", viewsController.createOneProduct) // vista para crear prods
  .get("/products/:pid", viewsController.getOneProduct) // vista de un prod
  .get("/carts/:cid", isAuth, viewsController.getOneCart) // vista de una cart
  .get("/register", isGuest, viewsController.register)
  .get("/login", isGuest, viewsController.login)
  .get("*", viewsController.notFound); // vista de un not found

export default router;
