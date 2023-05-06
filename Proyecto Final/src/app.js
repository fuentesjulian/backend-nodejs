// importo express
import express from "express";
// importo el carts y el products router
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";

// declaro mi app
const app = express();

// agrego middlewares de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// defino las rutas
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

// levanto al servidor en puerto 8080
app.listen(8080, () => {
  console.log("Escuchando en puerto 8080");
});
