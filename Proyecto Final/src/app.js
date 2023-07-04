// importo express
import express from "express";
// importo mongoose
import mongoose from "mongoose";
// importo handlebars
import handlebars from "express-handlebars";
// importo el carts y el products router
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import userRouter from "./routes/user.router.js";
// importo el router para las vistas
import viewsRouter from "./routes/views.router.js";

// importo un error middleware
import errorMiddleware from "./middleware/error.middleware.js";

// declaro mi app
const app = express();

// agrego middlewares de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setteo el engine
app.engine("handlebars", handlebars.engine());
// setteo rutas de archivos estaticos
app.use(express.static("public"));
//app.set("views", path.join(__dirname, "..", "/views"));
app.set("views", "views/");
app.set("view engine", "handlebars");

// defino las rutas
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/auth", userRouter);
app.use("/", viewsRouter);

// agrego el middleware para el manejo de error
app.use(errorMiddleware);

// conecto a mongoose
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

// levanto al servidor en puerto 8080
app.listen(8080, () => {
  console.log("Escuchando en puerto 8080");
});
