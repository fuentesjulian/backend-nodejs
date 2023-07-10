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
// importo el cookie parser
import cookieParser from "cookie-parser";
// importo passport
import passport from "passport";
import initPassport from "./config/passport.config.js";
// importo un error middleware
import errorMiddleware from "./middleware/error.middleware.js";
// importo middleware de jwt
import jwtMiddleware from "./middleware/jwt.middleware.js";

import userMiddleware from "./middleware/user.middleware.js";
import { isAuth } from "./middleware/auth.middleware.js";

// declaro mi app
const app = express();

import dotenv from "dotenv";

dotenv.config();

// agrego middlewares de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("B2zdY3B$pHmxW%"));

initPassport();
app.use(passport.initialize());

app.use(userMiddleware)
// setteo el engine
app.engine("handlebars", handlebars.engine());
// setteo rutas de archivos estaticos
app.use(express.static("public"));
//app.set("views", path.join(__dirname, "..", "/views"));
app.set("views", "views/");
app.set("view engine", "handlebars");


// defino las rutas
app.use("/api/carts", jwtMiddleware, cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/auth", userRouter);

app.use("/", viewsRouter);

// agrego el middleware para el manejo de error
app.use(errorMiddleware);

// conecto a mongoose
mongoose.connect(process.env.MONGO_URL);

// levanto al servidor en puerto 8080
app.listen(8080, () => {
  console.log("Escuchando en puerto 8080");
});
