// importo express
import express from "express";
// importo el carts y el products router
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
// importo mongoose
import mongoose from "mongoose";
// importo un error middleware
import errorMiddleware from "./middleware/error.middleware.js";

// declaro mi app
const app = express();

// agrego middlewares de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// defino las rutas
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

// agrego el middleware para el manejo de error
app.use(errorMiddleware);

// conecto a mongoose
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

// levanto al servidor en puerto 8080
app.listen(8080, () => {
  console.log("Escuchando en puerto 8080");
});
