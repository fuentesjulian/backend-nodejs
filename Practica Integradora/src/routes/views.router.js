// importo el router de express
import { Router } from "express";
// importo el productsManager
import productsManager from "../database/ProductManager.js";

import productDao from "../dao/Products.DAO.js";
// creo mi router
const router = Router();

// en el root renderizo los productos que obtengo con el productsManager
router.get("/", async (req, res) => {
  const products = await productDao.getAll();
  res.render("index", { products });
});

// en realtimeproducts renderizo la pagina y no le mando nada, lo obtiene por socket
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
