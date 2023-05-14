// importo express
import express from "express";
// importo el carts y el products router
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
// importo handlebars
import handlebars from "express-handlebars";

// declaro mi app
const app = express();

// agrego middlewares de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setteo el engine
app.engine("handlebars", handlebars.engine());

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
  res.render("index");
});

// defino las rutas
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

// levanto al servidor en puerto 8080
app.listen(8080, () => {
  console.log("Escuchando en puerto 8080");
});
