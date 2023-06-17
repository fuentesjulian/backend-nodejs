// importo el router de express
import { Router } from "express";
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

router.get("/register", (req, res) => {
  res.render("register");
});

export default router;
