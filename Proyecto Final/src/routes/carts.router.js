// importo el router de express
import { Router } from "express";
// importo el carts controller
import * as cartsController from "../controllers/carts.controllers.js";
// creo mi router
const router = Router();

router
  .post("/", cartsController.handleCart) // crear una cart
  .get("/:cid", cartsController.getCart) // obtener cart por id
  .post("/:cid/products/:pid", cartsController.addProduct) // agregar un prod a una cart
  .delete("/:cid/products/:pid", cartsController.removeProduct) // eliminar prod de una cart
  .put("/:cid", cartsController.updateCart) // actualizar cart con un json
  .put("/:cid/products/:pid", cartsController.updateProduct) // actualizar cantidad de un producto
  .post("/checkout/:cid", cartsController.checkout)
  .delete("/:cid", cartsController.clearCart); // limpiar cart

export default router;
