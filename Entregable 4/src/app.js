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
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// setteo rutas de archivos estaticos
app.use(express.static('public'));

//app.set("views", path.join(__dirname, "..", "/views"));
app.set("views", "views/");
app.set("view engine", "handlebars");

// importo el item manager
import ItemManager from "./database/ItemManager.js";
const productsManager = new ItemManager("./src/database/productos.json");

app.get("/", async (req, res) => {
  const products = await productsManager.getAll();
  res.render("index", { products });
});

app.get("/realtimeproducts",(req,res)=>{
  res.render("realTimeProducts")
})

// defino las rutas
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

// exporto la app
export default app;
