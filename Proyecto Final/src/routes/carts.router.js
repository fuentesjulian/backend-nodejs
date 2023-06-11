// importo el router de express
import { Router } from "express";
// importo el item manager
import ItemManager from "../database/ItemManager.js";
// importo el carts controller
import * as cartsController from "../controllers/carts.controllers.js";
// creo mi router
const router = Router();
// instancio cartsManager y el productsManager con el path
const cartsManager = new ItemManager("./src/database/carrito.json");
const productsManager = new ItemManager("./src/database/productos.json");

router
  .post("/", cartsController.createCart)
  .get("/:cid", cartsController.getCart)
  .post("/:cid/products/:pid", cartsController.addProduct)
  .delete("/:cid/products/:pid", cartsController.removeProduct)
  .put("/:cid", cartsController.updateCart)
  .put("/:cid/products/:pid", cartsController.updateProduct)
  .delete("/:cid", cartsController.removeProduct);

export default router;
