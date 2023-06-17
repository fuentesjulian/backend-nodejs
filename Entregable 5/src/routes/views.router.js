// importo el router de express
import { Router } from "express";
import productDao from "../dao/Products.DAO.js";
// importo el middleware de auth
import { isAuth, isGuest } from "../middleware/auth.middleware.js";

// creo mi router
const router = Router();

// en el root renderizo los productos que obtengo con el productsManager
router.get("/", async (req, res) => {
  const { user } = req.session;
  const title = "Fakestore";
  const products = await productDao.getAll();
  res.render("index", { products, user, title });
});

// en realtimeproducts renderizo la pagina y no le mando nada, lo obtiene por socket
router.get("/realtimeproducts", isAuth, (req, res) => {
  const { user } = req.session;
  res.render("realTimeProducts", { user });
});

router.get("/chat", (req, res) => {
  const { user } = req.session;
  res.render("chat", { user });
});

router.get("/register", isGuest, (req, res) => {
  const errorQuery = req.query.error;
  const success = req.query.success === "true" ? true : false;
  const error =
    errorQuery === "missing"
      ? "email and password are required"
      : errorQuery === "duplicate"
      ? "user already exists"
      : errorQuery === "internal"
      ? "internal server error, try later"
      : null;

  res.render("register", { error, success });
});

router.get("/login", isGuest, (req, res) => {
  const errorQuery = req.query.error;
  const error =
    errorQuery === "missing"
      ? "email and password are required"
      : errorQuery === "noauth"
      ? "invalid credentials"
      : errorQuery === "internal"
      ? "internal server error, try later"
      : null;
  res.render("login", { error });
});

export default router;
