// importo el router de express
import { Router } from "express";
// importo el carts controller
import * as cartsController from "../controllers/carts.controllers.js";
// creo mi router
const router = Router();

router
  .post("/", cartsController.createCart)
  .get("/:cid", cartsController.getCart)
  .post("/:cid/products/:pid", cartsController.addProduct)
  .delete("/:cid/products/:pid", cartsController.removeProduct)
  .put("/:cid", cartsController.updateCart)
  .put("/:cid/products/:pid", cartsController.updateProduct)
  .delete("/:cid", cartsController.removeProduct);

export default router;
