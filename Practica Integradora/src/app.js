// importo express
import express from "express";
// importo el carts y el products router
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/messages.router.js";

// importo handlebars
import handlebars from "express-handlebars";

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
app.use("/api/messages", messagesRouter);
app.use("/", viewsRouter);
// exporto la app
export default app;
